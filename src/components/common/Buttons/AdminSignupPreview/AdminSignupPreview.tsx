import React from 'react';
import classes from './AdminSignupPreview.module.css';

interface AdminSignupPreviewProps {
  name: string;
  email: string;
  role: string;
}

export const AdminSignupPreview: React.FC<AdminSignupPreviewProps> = ({ name, email, role }) => {
  return (
    <div className={classes.element}>
      <h3>Admin Signup Preview</h3>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Role:</strong> {role}</p>
    </div>
  );
};
