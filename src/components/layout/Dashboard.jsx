import React from 'react';

/**
 * Dashboard layout component that provides a responsive grid layout
 * for main content and sidebar panels
 * 
 * @param {ReactNode} leftPanel - Main content panel
 * @param {ReactNode} rightPanel - Sidebar panel
 * @param {string} className - Additional CSS classes
 */
const Dashboard = ({ leftPanel, rightPanel, className }) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${className || ''}`}>
      <div className="lg:col-span-2">
        {leftPanel}
      </div>
      <div className="lg:col-span-1">
        {rightPanel}
      </div>
    </div>
  );
};

export default Dashboard;