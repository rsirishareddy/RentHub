// import { useEffect, useState } from "react";
// import API from "../services/api";

// function Houses() {
//   const [houses, setHouses] = useState([]);
//   const [search, setSearch] = useState("");
//   const [typeFilter, setTypeFilter] = useState("");
//   const [priceFilter, setPriceFilter] = useState("");

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     fetchHouses();
//   }, []);

//   const fetchHouses = async () => {
//     try {
//       const response = await API.get("/houses");
//       setHouses(response.data.houses);
//     } catch (error) {
//       console.error("Error fetching houses:", error);
//     }
//   };

//   const handleBooking = async (houseId) => {
//     try {
//       if (!user) {
//         alert("Please login before booking.");
//         return;
//       }

//       await API.post("/bookings/create", {
//         user: user._id,
//         house: houseId,
//       });

//       alert("Booking created successfully!");
//     } catch (error) {
//       alert(error.response?.data?.message || "Booking failed");
//     }
//   };

//   const handleDelete = async (houseId) => {
//     try {
//       await API.delete(`/houses/${houseId}`);
//       alert("House deleted successfully!");
//       fetchHouses();
//     } catch (error) {
//       alert(error.response?.data?.message || "Delete failed");
//     }
//   };

//   const handleUpdatePrice = async (houseId) => {
//     const newPrice = prompt("Enter new price:");

//     if (!newPrice) return;

//     try {
//       await API.put(`/houses/${houseId}`, {
//         price: Number(newPrice),
//       });

//       alert("House price updated successfully!");
//       fetchHouses();
//     } catch (error) {
//       alert(error.response?.data?.message || "Update failed");
//     }
//   };

//   const filteredHouses = houses.filter((house) => {
//     const matchesLocation = house.location
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     const matchesType = typeFilter === "" || house.houseType === typeFilter;

//     const matchesPrice =
//       priceFilter === "" || house.price <= Number(priceFilter);

//     return matchesLocation && matchesType && matchesPrice;
//   });

//   return (
//     <div className="houses-page">
//       <h1>Available Houses</h1>

//       <p className="page-subtitle">
//         Browse rental houses available near you.
//       </p>

//       <input
//         type="text"
//         className="search-box"
//         placeholder="Search by location..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <div className="filter-box">
//         <select
//           value={typeFilter}
//           onChange={(e) => setTypeFilter(e.target.value)}
//         >
//           <option value="">All Types</option>
//           <option value="Appartment">Apartment</option>
//           <option value="Villa">Villa</option>
//           <option value="Independent House">Independent House</option>
//         </select>

//         <select
//           value={priceFilter}
//           onChange={(e) => setPriceFilter(e.target.value)}
//         >
//           <option value="">Any Price</option>
//           <option value="10000">Below ₹10,000</option>
//           <option value="20000">Below ₹20,000</option>
//           <option value="30000">Below ₹30,000</option>
//           <option value="50000">Below ₹50,000</option>
//         </select>
//       </div>

//       <div className="house-grid">
//         {filteredHouses.length > 0 ? (
//           filteredHouses.map((house) => (
//             <div className="house-card" key={house._id}>
//               {house.image ? (
//                 <img
//                   src={house.image}
//                   alt={house.title}
//                   className="house-real-img"
//                 />
//               ) : (
//                 <div className="house-img">🏠</div>
//               )}

//               <h3>{house.title}</h3>
//               <p>📍 {house.location}</p>
//               <p>🏡 {house.houseType}</p>
//               <p>
//                 🛏 {house.bedrooms} Bedrooms | 🚿 {house.bathrooms} Bathrooms
//               </p>

//               <h4>₹{house.price} / month</h4>

//               <div className="house-actions">
//                 <button onClick={() => handleBooking(house._id)}>
//                   Book Now
//                 </button>

//                 {user?.role === "owner" && (
//                   <>
//                     <button onClick={() => handleUpdatePrice(house._id)}>
//                       Update Price
//                     </button>

//                     <button
//                       className="delete-btn"
//                       onClick={() => handleDelete(house._id)}
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <h2>No Houses Found</h2>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Houses;



import { useEffect, useState } from "react";
import API from "../services/api";

function Houses() {
  const [houses, setHouses] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const response = await API.get("/houses");
      setHouses(response.data.houses);
    } catch (error) {
      console.error("Error fetching houses:", error);
    }
  };

  const handleBooking = async (houseId) => {
    try {
      if (!user) {
        alert("Please login before booking.");
        return;
      }

      await API.post("/bookings/create", {
        user: user._id,
        house: houseId,
      });

      alert("Booking created successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  const handleDelete = async (houseId) => {
    try {
      if (!user || user.role !== "owner") {
        alert("Only owners can delete houses.");
        return;
      }

      await API.delete(`/houses/${houseId}`, {
        data: {
          role: user.role,
        },
      });

      alert("House deleted successfully!");
      fetchHouses();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const handleUpdatePrice = async (houseId) => {
    const newPrice = prompt("Enter new price:");

    if (!newPrice) return;

    try {
      if (!user || user.role !== "owner") {
        alert("Only owners can update houses.");
        return;
      }

      await API.put(`/houses/${houseId}`, {
        price: Number(newPrice),
        role: user.role,
      });

      alert("House price updated successfully!");
      fetchHouses();
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  const filteredHouses = houses.filter((house) => {
    const matchesLocation = house.location
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType = typeFilter === "" || house.houseType === typeFilter;

    const matchesPrice =
      priceFilter === "" || house.price <= Number(priceFilter);

    return matchesLocation && matchesType && matchesPrice;
  });

  return (
    <div className="houses-page">
      <h1>Available Houses</h1>

      <p className="page-subtitle">
        Browse rental houses available near you.
      </p>

      <input
        type="text"
        className="search-box"
        placeholder="Search by location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filter-box">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Independent House">Independent House</option>
        </select>

        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="">Any Price</option>
          <option value="10000">Below ₹10,000</option>
          <option value="20000">Below ₹20,000</option>
          <option value="30000">Below ₹30,000</option>
          <option value="50000">Below ₹50,000</option>
        </select>
      </div>

      <div className="house-grid">
        {filteredHouses.length > 0 ? (
          filteredHouses.map((house) => (
            <div className="house-card" key={house._id}>
              {house.image ? (
                <img
                  src={house.image}
                  alt={house.title}
                  className="house-real-img"
                />
              ) : (
                <div className="house-img">🏠</div>
              )}

              <h3>{house.title}</h3>
              <p>📍 {house.location}</p>
              <p>🏡 {house.houseType}</p>
              <p>
                🛏 {house.bedrooms} Bedrooms | 🚿 {house.bathrooms} Bathrooms
              </p>

              <h4>₹{house.price} / month</h4>

              <div className="house-actions">
                <button onClick={() => handleBooking(house._id)}>
                  Book Now
                </button>

                {user?.role === "owner" && (
                  <>
                    <button onClick={() => handleUpdatePrice(house._id)}>
                      Update Price
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(house._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <h2>No Houses Found</h2>
        )}
      </div>
    </div>
  );
}

export default Houses;