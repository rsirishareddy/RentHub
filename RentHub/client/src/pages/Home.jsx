import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Rental Home</h1>

          <p>
            RentHub helps you discover verified rental houses quickly and
            easily. Browse listings, compare prices, and book your next home
            with confidence.
          </p>

          <div className="hero-buttons">
            <Link to="/houses" className="btn primary-btn">
              Browse Houses
            </Link>

            <Link to="/add-house" className="btn secondary-btn">
              Add House
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>🏠 Verified Houses</h3>
          <p>Only verified rental properties are listed on RentHub.</p>
        </div>

        <div className="feature-card">
          <h3>💰 Affordable Prices</h3>
          <p>Compare rental prices and choose the best option.</p>
        </div>

        <div className="feature-card">
          <h3>📅 Easy Booking</h3>
          <p>Book your preferred house with a simple booking process.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;