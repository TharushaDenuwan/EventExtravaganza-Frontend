import React, { useState } from 'react';
import styles from './home_page.module.css';
import Navigation from '../navigation/navigation';
import Footer from '../footer/planner_footer';

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    projectName: '',
    organizerName: '',
    dueDate: '',
    isPaid: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProjects(prev => [...prev, { ...newProject, id: Date.now() }]);
    setNewProject({
      projectName: '',
      organizerName: '',
      dueDate: '',
      isPaid: false
    });
    setShowModal(false);
  };

  const removeProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Navigation />
        <div className={styles.content}> 
          <div className={styles.header}>
            <h1 className={styles.title}>Your Projects</h1>
            <p className={styles.subtitle}>Here are your projects you currently working on</p>
          </div>

          <div className={styles.projectsSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Current Projects</h2>
              <button 
                className={styles.addButton}
                onClick={() => setShowModal(true)}
              >
                + Add New Project
              </button>
              <hr className={styles.divider} />
            </div>

            <div className={styles.projectsList}>
              {projects.map(project => (
                <div key={project.id} className={styles.projectCard}>
                  <div className={styles.projectInfo}>
                    <h3 className={styles.projectName}>{project.projectName}</h3>
                    <p className={styles.projectDetail}>Organizer: {project.organizerName}</p>
                    <p className={styles.projectDetail}>Due Date: {project.dueDate}</p>
                    <p className={styles.projectStatus}>
                      Status: {project.isPaid ? 'Paid' : 'Unpaid'}
                    </p>
                  </div>
                  <button 
                    className={styles.removeButton}
                    onClick={() => removeProject(project.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              {projects.length === 0 && (
                <p className={styles.noProjects}>No projects yet. Add your first project!</p>
              )}
            </div>

            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Project History</h2>
              <hr className={styles.divider} />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Add New Project</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="projectName">Project Name:</label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={newProject.projectName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="organizerName">Organizer Name:</label>
                <input
                  type="text"
                  id="organizerName"
                  name="organizerName"
                  value={newProject.organizerName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="dueDate">Due Date:</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={newProject.dueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="isPaid"
                    checked={newProject.isPaid}
                    onChange={handleInputChange}
                  />
                  Paid Project
                </label>
              </div>

              <div className={styles.modalActions}>
                <button type="submit" className={styles.submitButton}>
                  Add Project
                </button>
                <button 
                  type="button" 
                  className={styles.cancelButton}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}