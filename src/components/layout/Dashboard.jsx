import React from 'react';

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