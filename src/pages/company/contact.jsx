import React from 'react';
import './styles.css'; // Import the CSS file for styling

export const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-info">
        <h1>Contact Us</h1>
        <p>If you have any questions or inquiries, feel free to get in touch with us!</p>
        <div className="contact-details">
          <div className="contact-detail">
            <h3>Address:</h3>
            <p>123 Superfoods Street,</p>
            <p>Healthyville, HV 12345</p>
          </div>
          <div className="contact-detail">
            <h3>Email:</h3>
            <p>info@superfoods.com</p>
          </div>
          <div className="contact-detail">
            <h3>Phone:</h3>
            <p>+123 456 7890</p>
          </div>
        </div>
      </div>
      <div className="contact-form">
        <h2>Send us a Message</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="5"></textarea>
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};
