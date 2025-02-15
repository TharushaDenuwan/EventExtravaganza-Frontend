import React, { useState } from 'react';
import Navigation from '../components/navigation/navigation';
import '../budget_filtering/budget_filtering.css';
import '../checklist/checklist.css';

export default function Checklist() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [checklistName, setChecklistName] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState('Not Started');
  const [dueDate, setDueDate] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('High');

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => {
    setChecklistName('');
    setOrganizerName('');
    setTaskName('');
    setTaskStatus('Not Started');
    setDueDate('');
    setPriorityLevel('High');
    setIsPopupOpen(false);
  };

  const openPreview = () => {
    setIsPopupOpen(false); // Close the input popup
    setIsPreviewOpen(true); // Open the preview popup
  };

  const closePreview = () => {
    setIsPreviewOpen(false); // Close the preview popup
  };

  return (
    <div>
      <Navigation />

      <h3 className='h3'><span className='green-pipe'>|</span> Extravaganza unit</h3>
      <p className='p1'>Crafted By Event Planners.<br />Perfect for Seamless <span className="box-text">Checklists</span></p>

      <p className='p2'>
        Creating the perfect checklist for your event has never been easier! Simply <br />
        select the tasks you need, and our system will instantly generate a tailored <br />
        checklist that ensures no detail is missed. This feature makes planning your <br />
        event seamless and organized, allowing you to stay on track and stress-free <br />
        throughout the planning process.
      </p>

      <div className='trangle'></div>

      <button className='button1' onClick={openPopup}>Create Checklist</button>

      {/* Input Popup Window */}
      {isPopupOpen && (
        <div className='popup'>
          <div className='popup-content'>
            <span className='close-btn' onClick={closePopup}>&times;</span>
            <h2>Create your checklist</h2>
            <form>
              <div className='left-col'>
                <p>Checklist Name:</p>
                <input
                  className='input1'
                  type='text'
                  placeholder='Enter the name of the checklist'
                  value={checklistName}
                  onChange={(e) => setChecklistName(e.target.value)}
                />
              </div>
              <div className='right-col'>
                <p>Organizer Name:</p>
                <input
                  className='input1'
                  type='text'
                  placeholder='Enter the name of organizer'
                  value={organizerName}
                  onChange={(e) => setOrganizerName(e.target.value)}
                />
              </div>
            </form>
            <p><b>Start adding tasks to your event checklist</b></p>
            <form>
              <div className='left-col'>
                <p>Task Name:</p>
                <input
                  className='input1'
                  type='text'
                  placeholder='Enter name of the task'
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
                <p>Status:</p>
                <select
                  id='status'
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                >
                  <option value='Not Started'>Not Started</option>
                  <option value='Pending'>Pending</option>
                  <option value='Completed'>Complete</option>
                </select>
              </div>
              <div className='right-col'>
                <p>Due Date:</p>
                <input
                  type='date'
                  className='input1'
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <p>Priority Level:</p>
                <select
                  id='priority'
                  value={priorityLevel}
                  onChange={(e) => setPriorityLevel(e.target.value)}
                >
                  <option value='High'>High</option>
                  <option value='Medium'>Medium</option>
                  <option value='Low'>Low</option>
                </select>
              </div>
            </form><br />
            <button className='button2' onClick={openPreview}>Create</button>
          </div>
        </div>
      )}

      {/* Preview Popup Window */}
      {isPreviewOpen && (
        <div className='popup'>
          <div className='popup-content'>
            <span className='close-btn' onClick={closePreview}>&times;</span>
            <h2>Checklist Preview</h2>
            <div className='preview-section'>
              <h3>Preview</h3>
              <p><strong>Checklist Name:</strong> {checklistName}</p>
              <p><strong>Organizer Name:</strong> {organizerName}</p>
              <p><strong>Task Name:</strong> {taskName}</p>
              <p><strong>Status:</strong> {taskStatus}</p>
              <p><strong>Due Date:</strong> {dueDate}</p>
              <p><strong>Priority Level:</strong> {priorityLevel}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
