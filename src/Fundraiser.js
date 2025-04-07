import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Fundraiser.css";

const Fundraiser = () => {
  const [donors, setDonors] = useState([]);
  const [newDonor, setNewDonor] = useState({ name: "", hospital: "", amount: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setNewDonor({ ...newDonor, [e.target.name]: e.target.value });
  };

  // Fetch donors from the backend
  const fetchDonors = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/fundraiser/all");
      setDonors(response.data); // Update state with fetched donors
      setLoading(false);
    } catch (error) {
      console.error("Error fetching donors:", error.response?.data || error.message);
      setError("Failed to load donors. Please try again later.");
      setLoading(false);
    }
  };

  // Add new donor to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newDonor.name && newDonor.hospital && newDonor.amount) {
      try {
        await axios.post("http://localhost:5000/api/fundraiser/add", newDonor);
        alert("Donor added successfully!");
        setNewDonor({ name: "", hospital: "", amount: "" }); // Clear form
        fetchDonors(); // Refresh donor list
      } catch (error) {
        console.error("Error adding donor:", error.response?.data || error.message);
        alert("Failed to add donor. Please check your input.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Load donors when the component mounts
  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <div className="fundraiser-container">
      <h1 className="fundraiser-title">Fundraiser Donations</h1>
      <p className="fundraiser-subtitle">Thank you to our generous donors for supporting young artists!</p>

      {/* Form to add new donors */}
      <form className="donor-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newDonor.name}
          onChange={handleChange}
          placeholder="Donor Name"
          required
        />
        <input
          type="text"
          name="hospital"
          value={newDonor.hospital}
          onChange={handleChange}
          placeholder="Hospital Name"
          required
        />
        <input
          type="number"
          name="amount"
          value={newDonor.amount}
          onChange={handleChange}
          placeholder="Donation Amount"
          min="1"
          required
        />
        <button type="submit">Add Donor</button>
      </form>

      {/* Loading message */}
      {loading && <p>Loading donors...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Display Donor Cards */}
      {!loading && donors.length > 0 ? (
        <div className="donation-cards">
          {donors.map((donor, index) => (
            <div key={index} className="donation-card">
              <h3>{donor.name}</h3>
              <p><strong>Hospital:</strong> {donor.hospital}</p>
              <p><strong>Amount Donated:</strong> ${donor.amount}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No donors found.</p>
      )}
    </div>
  );
};

export default Fundraiser;