import React, { useState } from 'react';
import Navigation from '../event_planner_site/navigation/navigation';
import Styles from '../checklist/checklist.module.css';
import Footer from '../event_planner_site/footer/planner_footer';

export default function Checklist() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [checklistName, setChecklistName] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState('Not Started');
  const [dueDate, setDueDate] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('High');
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => {
    setChecklistName('');
    setOrganizerName('');
    setTaskName('');
    setTaskStatus('Not Started');
    setDueDate('');
    setPriorityLevel('High');
    setTasks([]);
    setEditingIndex(null);
    setIsPopupOpen(false);
    setMessage('');
  };

  const openPreview = () => {
    setIsPopupOpen(false);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setMessage('');
  };

  const addTask = () => {
    if (!taskName) {
      setMessage("Task name cannot be empty.");
      return;
    }

    const newTask = {
      name: taskName,
      status: taskStatus,
      dueDate,
      priority: priorityLevel,
    };

    setTasks([...tasks, newTask]);
    setTaskName('');
    setTaskStatus('Not Started');
    setDueDate('');
    setPriorityLevel('High');
    setMessage("Task added successfully!");
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setTaskName(taskToEdit.name);
    setTaskStatus(taskToEdit.status);
    setDueDate(taskToEdit.dueDate);
    setPriorityLevel(taskToEdit.priority);
    setEditingIndex(index);
    setIsPreviewOpen(false);
    setIsPopupOpen(true);
  };

  const updateTask = () => {
    if (editingIndex === null) {
      setMessage("No task selected for editing.");
      return;
    }

    const updatedTask = {
      name: taskName,
      status: taskStatus,
      dueDate,
      priority: priorityLevel,
    };

    const updatedTasks = [...tasks];
    updatedTasks[editingIndex] = updatedTask;
    setTasks(updatedTasks);
    setTaskName('');
    setTaskStatus('Not Started');
    setDueDate('');
    setPriorityLevel('High');
    setEditingIndex(null);
    setMessage("Task updated successfully!");
  };

  const deleteTask = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      setTasks(tasks.filter((_, i) => i !== index));
      setMessage("Task deleted successfully!");
    }
  };

  const createChecklist = async () => {
    if (!checklistName || !organizerName || tasks.length === 0) {
      setMessage("Please fill in all fields and add at least one task.");
      return;
    }

    setLoading(true);
    setMessage("Creating checklist...");

    try {
      const response = await fetch('http://localhost:5000/api/checklists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checklistName, organizerName, tasks }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      setMessage("Checklist created successfully!");
      closePopup();
    } catch (error) {
      setMessage("Failed to create checklist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Styles.container}>
      <Navigation />
      <h3 className={Styles.h3}>
        <span className={Styles["green-pipe"]}>|</span> Extravaganza Unit
      </h3>

      <div className={Styles.heroSection}>
        <div className={Styles.heroContent}>
          <p className={Styles.p1}>
            Crafted By Event Planners.<br />Perfect for Seamless{' '}
            <br /> <span className={Styles["box-text"]}>Checklists</span>
          </p>
          <p className={Styles.p2}>
            Creating the perfect checklist for your event has never been easier! Simply
            select the tasks you need, and our system will instantly generate a tailored
            checklist that ensures no detail is missed.
          </p>
          <button className={Styles.button1} onClick={openPopup}>Create Checklist</button>
        </div>
        <div className={Styles.heroImage}></div>
      </div>

      <div className={Styles.featuresGrid}>
        <div className={Styles.featureCard}>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/1087/1087927.png" 
            alt="Task Management" 
            className={Styles.featureIcon}
          />
          <h4 className={Styles.featureTitle}>Task Management</h4>
          <p className={Styles.featureDescription}>
            Organize and prioritize your tasks efficiently with our intuitive task management system.
          </p>
        </div>
        <div className={Styles.featureCard}>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2910/2910824.png" 
            alt="Progress Tracking" 
            className={Styles.featureIcon}
          />
          <h4 className={Styles.featureTitle}>Progress Tracking</h4>
          <p className={Styles.featureDescription}>
            Monitor your event planning progress with real-time status updates and notifications.
          </p>
        </div>
        <div className={Styles.featureCard}>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/1584/1584892.png" 
            alt="Collaboration" 
            className={Styles.featureIcon}
          />
          <h4 className={Styles.featureTitle}>Team Collaboration</h4>
          <p className={Styles.featureDescription}>
            Work seamlessly with your team members and keep everyone on the same page.
          </p>
        </div>
      </div>
      
      {isPopupOpen && (
        <div className={Styles.popup}>
          <div className={Styles["popup-content"]}>
            <span className={Styles["close-btn"]} onClick={closePopup}>&times;</span>
            <h2>Create your checklist</h2>

            <div className={Styles.formGrid}>
              <div className={Styles.inputGroup}>
                <p>Checklist Name:</p>
                <input className={Styles.input1} type="text" value={checklistName} onChange={(e) => setChecklistName(e.target.value)} />
              </div>
              <div className={Styles.inputGroup}>
                <p>Organizer Name:</p>
                <input className={Styles.input1} type="text" value={organizerName} onChange={(e) => setOrganizerName(e.target.value)} />
              </div>

              <div className={Styles.inputGroup}>
                <p>Task Name:</p>
                <input className={Styles.input1} type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
              </div>
              <div className={Styles.inputGroup}>
                <p>Status:</p>
                <select className={Styles.select} value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
                  <option value="Not Started">Not Started</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Complete</option>
                </select>
              </div>

              <div className={Styles.inputGroup}>
                <p>Due Date:</p>
                <input className={Styles.input1} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
              <div className={Styles.inputGroup}>
                <p>Priority Level:</p>
                <select className={Styles.select} value={priorityLevel} onChange={(e) => setPriorityLevel(e.target.value)}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className={Styles.buttonGroup}>
                {editingIndex !== null ? (
                  <button className={Styles.button2} onClick={updateTask}>Update Task</button>
                ) : (
                  <button className={Styles.button2} onClick={addTask}>Add Task</button>
                )}
                <button className={Styles.button2} onClick={openPreview}>Preview</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPreviewOpen && (
        <div className={Styles.popup}>
          <div className={Styles["popup-content"]}>
            <span className={Styles["close-btn"]} onClick={closePreview}>&times;</span>
            <h2 className={Styles.preview}>Checklist Preview</h2>
            <p className={Styles.previewData}><strong>Checklist Name:</strong> {checklistName}</p>
            <p><strong>Organizer Name:</strong> {organizerName}</p>
            <div className={Styles.previewSection}>
              <table>
                <thead>
                  <tr>
                    <th>Task Name</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={index}>
                      <td>{task.name}</td>
                      <td>{task.status}</td>
                      <td>{task.dueDate}</td>
                      <td>{task.priority}</td>
                      <td>
                        <button className={Styles.optionButton} onClick={() => editTask(index)}>Edit</button>
                        <button className={Styles.optionButton} onClick={() => deleteTask(index)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {message && <p className={Styles["success-message"]}>{message}</p>}
            <button 
              className={Styles.createButton} 
              disabled={loading || !checklistName || !organizerName || tasks.length === 0} 
              onClick={createChecklist}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}