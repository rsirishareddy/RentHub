import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>🏠 RentHub</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/houses">Houses</Link>

        {token ? (
          <>
            <Link to="/add-house">Add House</Link>
            <Link to="/my-bookings">My Bookings</Link>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;