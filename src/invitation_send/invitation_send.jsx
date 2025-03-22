import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import emailjs from 'emailjs-com';
import Navigation from '../components/navigation/navigation';
import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';
import styles from './invitation_send.module.css';
import Footer from '../components/footer/footer';


emailjs.init("4Whebqy2IefyJuPHa");

const compressImage = (base64String, maxWidth = 800) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64String;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        height = (maxWidth * height) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.7));
    };
  });
};

export default function EventInvitation() {
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    invitees: '',
  });

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const invitationRef = useRef(null);

  const validateEmails = (emails) => {
    const emailList = emails.split(',').map(email => email.trim());
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = emailList.filter(email => !emailRegex.test(email));
    return invalidEmails.length === 0 ? null : invalidEmails;
  };

  const handleChange = (e) => {
    setError('');
    setSuccess('');
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleTemplateSelect = (template) => {
    setError('');
    setSelectedTemplate(template);
  };

  const validateForm = () => {
    const emptyFields = Object.entries(eventDetails)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      setError(`Please fill out all fields: ${emptyFields.join(', ')}`);
      return false;
    }

    const invalidEmails = validateEmails(eventDetails.invitees);
    if (invalidEmails) {
      setError(`Invalid email addresses: ${invalidEmails.join(', ')}`);
      return false;
    }

    if (!selectedTemplate) {
      setError('Please select a template');
      return false;
    }

    return true;
  };

  const handleGenerateInvitation = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const canvas = await html2canvas(invitationRef.current);
      const originalImage = canvas.toDataURL('image/jpeg');
      const compressedImage = await compressImage(originalImage);
      
      await sendEmail(compressedImage);
      
      setSuccess('Invitation sent successfully!');
      setEventDetails({
        eventName: '',
        eventDate: '',
        eventTime: '',
        eventLocation: '',
        invitees: '',
      });
      setSelectedTemplate(null);
    } catch (err) {
      console.error('Error sending invitation:', err);
      setError(err.message || 'Failed to send invitation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmail = async (image) => {
    const serviceID = 'service_hh0a5cm';
    const templateID = 'template_2cdp6y7';
    const userID = '4Whebqy2IefyJuPHa';
  
    const inviteesArray = eventDetails.invitees.split(',').map(email => email.trim());
  
    try {
      const emailPromises = inviteesArray.map(async (email) => { 
        const templateParams = {
          to_email: email, 
          event_name: eventDetails.eventName,
          event_date: eventDetails.eventDate,
          event_time: eventDetails.eventTime,
          event_location: eventDetails.eventLocation,
          invitation_image: image
        };

        return emailjs.send(serviceID, templateID, templateParams, userID);
      });

      const responses = await Promise.all(emailPromises);
      console.log('Emails sent successfully:', responses);
      return responses;
    } catch (error) {
      console.error('EmailJS Error:', error);
      throw new Error('Failed to send invitations. Please try again.');
    }
  };

  const getTemplateComponent = () => {
    switch (selectedTemplate) {
      case 'template1':
        return <Template1 eventDetails={eventDetails} />;
      case 'template2':
        return <Template2 eventDetails={eventDetails} />;
      case 'template3':
        return <Template3 eventDetails={eventDetails} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navigation />

      <div className={styles.box1}>
        <h3 className={styles.h3}>
          <span className={styles['green-pipe']}>|</span> Event Invitation Generator
        </h3>
        <p className={styles.p1}>
          Create and send beautiful event invitations to your guests via email.
        </p>

        {error && <div className={styles['error-message']}>{error}</div>}
        {success && <div className={styles['success-message']}>{success}</div>}

        <form className={styles['event-form']}>
          <div>
            <label>Event Name</label>
            <input
              type="text"
              name="eventName"
              placeholder="Enter event name"
              value={eventDetails.eventName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Event Date</label>
            <input
              type="date"
              name="eventDate"
              value={eventDetails.eventDate}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Event Time</label>
            <input
              type="time"
              name="eventTime"
              value={eventDetails.eventTime}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Event Location</label>
            <input
              type="text"
              name="eventLocation"
              placeholder="Enter location"
              value={eventDetails.eventLocation}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Invitee Emails (comma-separated)</label>
            <textarea
              name="invitees"
              placeholder="Enter invitee email addresses"
              value={eventDetails.invitees}
              onChange={handleChange}
              required
            />
          </div>

          <h4>Select Invitation Template</h4>
          <div className={styles['template-container']}>
            <ul>
              <li
                className={`${styles.template} ${selectedTemplate === 'template1' ? styles.selected : ''}`}
                onClick={() => handleTemplateSelect('template1')}
              >
                Elegant
              </li>
              <li
                className={`${styles.template} ${selectedTemplate === 'template2' ? styles.selected : ''}`}
                onClick={() => handleTemplateSelect('template2')}
              >
                Modern
              </li>
              <li
                className={`${styles.template} ${selectedTemplate === 'template3' ? styles.selected : ''}`}
                onClick={() => handleTemplateSelect('template3')}
              >
                Classic
              </li>
            </ul>
          </div>

          <div ref={invitationRef} className={styles['invitation-preview']}>
            {getTemplateComponent()}
          </div>

          <button 
            type="button" 
            className={styles.button1} 
            onClick={handleGenerateInvitation}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Generate & Send Invitation'}
          </button>
        </form>

      </div>
      <Footer/>

    </>
  );
}