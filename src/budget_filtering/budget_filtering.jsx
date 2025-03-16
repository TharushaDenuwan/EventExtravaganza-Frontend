import React, { useState } from 'react';
import Navigation from '../components/navigation/navigation';
import './budget_filtering.css';
import Footer from '../components/footer/footer';

export default function BudgetFiltering() {
  const [budget, setBudget] = useState('');
  const [eventPlanners, setEventPlanners] = useState([]);
  const [selectedPlanner, setSelectedPlanner] = useState(null); // State to track the selected planner

  // Function to handle the "Search" button click
  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:5000/budgetFilter/budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Budget: budget }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setEventPlanners(data);
    } catch (error) {
      console.error('Error fetching event planners:', error);
    }
  };

  // Function to open the pop-up with planner details
  const openPopup = (planner) => {
    setSelectedPlanner(planner);
  };

  // Function to close the pop-up
  const closePopup = () => {
    setSelectedPlanner(null);
  };

  return (
    <div className='container'>
      <Navigation />

      <div className='container2'>
        <div className='box1'>
          <h3 className='h3'><span className='green-pipe'>|</span> Extravaganza unit</h3>
          <p className='p1'>Loved By Event Organizers.<br />Built for <span className="box-text">Budget Filtering</span></p>

          <p className='p2'>
            Finding the perfect event planner within your budget has never been easier! Simply <br />
            enter your desired budget range, and our system will instantly display a list of <br />
            available event planners that match your price preferences.
          </p>
        </div>

        <div className='box6'>
        
        </div>
      </div>

      <div className='container3'>
        <div>
          <span className='span1'>Rs:</span>
          <input
            className='input1'
            type="number"
            placeholder='Enter Your Budget Range'
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <button className='button1' onClick={handleSearch}>Search</button>
        </div>

        <div className='box2'>
          <h1 className='box2h1'>Available Event Planners</h1>
          <hr style={{ border: "2px solid #0073e5" }} />

          <div className='smallbox'>
            {eventPlanners.length > 0 ? (
              eventPlanners.map((planner, index) => (
                <div key={index} className="planner-card">
                  <b><p>Full Name: {planner.FullName}</p></b>
                  <b><p>Email: {planner.Email}</p></b>
                  <button className="profile" onClick={() => openPopup(planner)}>View Profile</button>
                </div>
              ))
            ) : (
              <p className='boxp1'>No event planners found within the specified budget.</p>
            )}
          </div>
        </div>
      </div>

      {selectedPlanner && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closePopup}>X</button>
            <h2>Event Planner Details</h2>
            <p><b>Full Name:</b> {selectedPlanner.FullName}</p>
            <p><b>Email:</b> {selectedPlanner.Email}</p>
            <p><b>Contact Number:</b> {selectedPlanner.ContactNumber}</p>
            <p><b>Address:</b> {selectedPlanner.Address}</p>
            <p><b>City:</b> {selectedPlanner.City}</p>
            <p><b>Gender:</b> {selectedPlanner.Gender}</p>
            <p><b>Speciality:</b> {selectedPlanner.Speciality}</p>
            <p><b>Budget:</b> Rs {selectedPlanner.Budget}</p>
            <p><b>Experience:</b> {selectedPlanner.Experience} years</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
