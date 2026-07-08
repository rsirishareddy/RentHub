import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddHouse() {
  const navigate = useNavigate();

  const [house, setHouse] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    houseType: "",
    bedrooms: "",
    bathrooms: "",
    image: "",
    amenities: "",
  });

  const handleChange = (e) => {
    setHouse({
      ...house,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get logged-in user
      const user = JSON.parse(localStorage.getItem("user"));

      const data = {
        ...house,
        role: user?.role,
        amenities: house.amenities
          .split(",")
          .map((item) => item.trim()),
      };

      await API.post("/houses/add", data);

      alert("House Added Successfully!");

      navigate("/houses");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to Add House");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ width: "500px" }}>
        <h2>Add House</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="House Title"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="houseType"
            placeholder="House Type"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
          />

          <input
            type="text"
            name="amenities"
            placeholder="Amenities (comma separated)"
            onChange={handleChange}
          />

          <button type="submit">Add House</button>
        </form>
      </div>
    </div>
  );
}

export default AddHouse;