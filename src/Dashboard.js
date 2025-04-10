import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css';
import { useNavigate } from "react-router-dom";

const hospitals = {
  'City Hospital': ['Dr. Alice Brown', 'Dr. Emily Davis', 'Dr. John Smith'],
  'Fortis Healthcare': ['Dr. Sarah Lee', 'Dr. Michael Harris', 'Dr. David Kim'],
  'Apollo Hospital': ['Dr. Emma White', 'Dr. Olivia Green', 'Dr. James Wilson']
};

const Dashboard = () => {
  const [patient, setPatient] = useState({ name: '', age: '', hospital: '', doctor: '' });
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dashboard/list');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (patient.name && patient.age && patient.hospital && patient.doctor) {
        await axios.post('http://localhost:5000/api/dashboard/add', patient);
        setPatient({ name: '', age: '', hospital: '', doctor: '' });
        fetchPatients();
      }
    } catch (error) {
      console.error('Error adding patient:', error.message);
    }
  };

  return (
    <div className={styles.container}>
      {/* Background layer */}
      <div className={styles.background}></div>
      
      {/* Content layer */}
      <div className={styles.content}>
        <h1 className={styles.dashboardMainTitle}>Dashboard</h1>
        
        <div className={styles.dashboardContainer}>
          <div className={styles.formContainer}>
            <h2>Patient Details</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Patient Name"
                value={patient.name}
                onChange={handleChange}
                required
                className={styles.inputField}
              />
              <input
                type="number"
                name="age"
                placeholder="Age (5-15)"
                value={patient.age}
                onChange={handleChange}
                min="5"
                max="15"
                required
                className={styles.inputField}
              />
              <select 
                name="hospital" 
                value={patient.hospital} 
                onChange={handleChange} 
                required
                className={styles.selectField}
              >
                <option value="">Select Hospital</option>
                {Object.keys(hospitals).map((hospital) => (
                  <option key={hospital} value={hospital}>{hospital}</option>
                ))}
              </select>
              {patient.hospital && (
                <select 
                  name="doctor" 
                  value={patient.doctor} 
                  onChange={handleChange} 
                  required
                  className={styles.selectField}
                >
                  <option value="">Select Doctor</option>
                  {hospitals[patient.hospital].map((doc) => (
                    <option key={doc} value={doc}>{doc}</option>
                  ))}
                </select>
              )}
              <button type="submit" className={styles.submitButton}>
                Add Patient
              </button>
            </form>
          </div>

          <div className={styles.tableContainer}>
            <h2>Patient List</h2>
            <table className={styles.patientTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Hospital</th>
                  <th>Doctor</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p, index) => (
                  <tr key={index}>
                    <td>{p.name}</td>
                    <td>{p.age}</td>
                    <td>{p.hospital}</td>
                    <td>{p.doctor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Centered Canvas Button */}
        <div className={styles.canvasButtonContainer}>
          <button 
            onClick={() => navigate("/coloring")} 
            className={styles.canvasButton}
          >
            Canvas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
