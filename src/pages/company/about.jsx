import React from 'react';
import './styles.css';

export const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-heading">Welcome to Superfoods!</h1>
      <div className="about-content">
        <p className="about-paragraph">
          <strong>Our Story</strong><br />
          Superfoods began with a simple idea: to make nutritious superfoods accessible to everyone. Founded by a health enthusiast, Elise embarked on a journey to curate a diverse range of superfoods known for their exceptional health benefits.
        </p>
        <p className="about-paragraph">
          <strong>Our Commitment to Quality</strong><br />
          Quality is at the heart of everything we do. We understand that your health is non-negotiable, which is why we go above and beyond to ensure that every product you purchase from us is of the highest standard.
        </p>
        <p className="about-paragraph">
          <strong>Our Products</strong><br />
          Discover a world of wellness with our extensive range of superfoods. Whether you're looking to boost your immunity, enhance your energy levels, or simply nourish your body with wholesome goodness, we have something for everyone.
        </p>
        <p className="about-paragraph">
          <strong>Our Community</strong><br />
          At Superfoods, we believe in the power of community. Join us on our journey to better health and vibrant living as we share valuable insights, recipes, and wellness tips with our growing community of health enthusiasts.
        </p>
        <p className="about-paragraph">
          <strong>Get in Touch</strong><br />
          Thank you for choosing Superfoods as your trusted source for premium superfoods. We are committed to your satisfaction and are here to assist you every step of the way. If you have any questions, feedback, or inquiries, please don't hesitate to reach out to our friendly customer support team.
        </p>
      </div>
    </div>
  );
}
