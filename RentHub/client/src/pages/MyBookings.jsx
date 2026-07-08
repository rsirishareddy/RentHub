import { useEffect, useState } from "react";
import API from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login to view bookings.");
        return;
      }

      const response = await API.get(`/bookings?userId=${user._id}`);
      setBookings(response.data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  return (
    <div className="houses-page">
      <h1>My Bookings</h1>
      <p className="page-subtitle">
        View all your booked rental houses.
      </p>

      <div className="house-grid">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div className="house-card" key={booking._id}>
              <div className="house-img">📅</div>

              <h3>
                {booking.house?.title || "House details not available"}
              </h3>

              <p>
                📍 {booking.house?.location || "Location not available"}
              </p>

              <h4>
                ₹{booking.house?.price || 0} / month
              </h4>

              <p>
                <strong>Status:</strong>{" "}
                <span className="status-pending">
                  {booking.status}
                </span>
              </p>

              <p>
                <strong>Booking Date:</strong>{" "}
                {new Date(booking.bookingDate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <h2>No Bookings Found</h2>
        )}
      </div>
    </div>
  );
}

export default MyBookings;