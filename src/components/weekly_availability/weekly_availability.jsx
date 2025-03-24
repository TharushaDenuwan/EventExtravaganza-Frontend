import React, { useState } from "react";
import { FaEdit, FaSave, FaPlus, FaTrash } from "react-icons/fa";
import "./weekly_availability.css"; // Import CSS for styling

const WeeklyAvailability = ({ onSave, displayOnly = false, availability = {} }) => {
  // Default to empty (all days marked as "Busy" if no data is provided)
  const defaultAvailability = {
    Monday: ["Busy"],
    Tuesday: ["Busy"],
    Wednesday: ["Busy"],
    Thursday: ["Busy"],
    Friday: ["Busy"],
    Saturday: ["Busy"],
    Sunday: ["Busy"],
  };

  // Use provided availability or fallback to default
  const [availabilityState, setAvailabilityState] = useState({ ...defaultAvailability, ...availability });
  const [editingDay, setEditingDay] = useState(null);
  const [newSlots, setNewSlots] = useState([]);

  const handleEdit = (day) => {
    setEditingDay(day);
    setNewSlots(availabilityState[day].includes("Busy") ? [] : [...availabilityState[day]]);
  };

  const handleAddSlot = () => {
    setNewSlots([...newSlots, ""]);
  };

  const handleSlotChange = (index, value) => {
    const updatedSlots = [...newSlots];
    updatedSlots[index] = value;
    setNewSlots(updatedSlots);
  };

  const handleDeleteSlot = (index) => {
    const updatedSlots = newSlots.filter((_, i) => i !== index);
    setNewSlots(updatedSlots);
  };

  const handleSave = () => {
    const filteredSlots = newSlots.filter((slot) => slot.trim() !== "");
    const updatedAvailability = {
      ...availabilityState,
      [editingDay]: filteredSlots.length === 0 ? ["Busy"] : filteredSlots,
    };
    setAvailabilityState(updatedAvailability);
    setEditingDay(null);
    onSave(updatedAvailability); // Send updated data to parent
  };

  return (
    <div className="container">
      <h2>Weekly Availability</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Available Slots</th>
            {!displayOnly && <th>Actions</th>} {/* Hide Actions column if displayOnly is true */}
          </tr>
        </thead>
        <tbody>
          {Object.keys(availabilityState).map((day) => (
            <tr key={day}>
              <td>{day}</td>
              <td>
                {editingDay === day ? (
                  <div>
                    {newSlots.map((slot, index) => (
                      <div key={index} className="slot-input">
                        <input
                          type="text"
                          value={slot}
                          onChange={(e) => handleSlotChange(index, e.target.value)}
                          placeholder="e.g., 09:00 AM - 11:00 AM"
                          required={false}
                        />
                        <button type="button" className="delete-btn" onClick={() => handleDeleteSlot(index)}>
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                    <button type="button" className="add-slot-btn" onClick={handleAddSlot}>
                      <FaPlus /> Add Slot
                    </button>
                  </div>
                ) : (
                  availabilityState[day].join(", ")
                )}
              </td>
              {!displayOnly && (
                <td>
                  {editingDay === day ? (
                    <button type="button" className="save-btn" onClick={handleSave}>
                      <FaSave /> Save
                    </button>
                  ) : (
                    <button type="button" className="edit-btn" onClick={() => handleEdit(day)}>
                      <FaEdit /> Edit
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyAvailability;
