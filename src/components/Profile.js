import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Profile Avatar" 
              className="avatar-img"
            />
          </div>
          <h1 className="profile-name">John Doe</h1>
          <p className="profile-title">Software Developer</p>
        </div>
        
        <div className="profile-body">
          <div className="profile-section">
            <h2>About</h2>
            <p>
              Passionate software developer with expertise in React, Node.js, and modern web technologies. 
              Always learning and building innovative solutions.
            </p>
          </div>
          
          <div className="profile-section">
            <h2>Contact</h2>
            <div className="contact-info">
              <p><strong>Email:</strong> john.doe@example.com</p>
              <p><strong>Location:</strong> San Francisco, CA</p>
            </div>
          </div>
          
          <div className="profile-section">
            <h2>Skills</h2>
            <div className="skills-list">
              <span className="skill-tag">React</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">TypeScript</span>
              <span className="skill-tag">CSS</span>
              <span className="skill-tag">HTML</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
