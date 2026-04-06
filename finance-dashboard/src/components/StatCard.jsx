import React from 'react';
import './StatCard.css';

/**
 * Props:
 *   icon      – emoji or text symbol
 *   iconColor – 'blue' | 'green' | 'red' | 'amber'
 *   label     – card heading
 *   value     – formatted string shown large
 *   change    – small subtitle text
 *   changeDir – 'up' | 'down' | 'neutral'
 */
export default function StatCard({ icon, iconColor = 'blue', label, value, change, changeDir = 'neutral' }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon-wrap icon-${iconColor}`}>{icon}</div>
      <p className="stat-label">{label}</p>
      <p className={`stat-value value-${iconColor}`}>{value}</p>
      {change && (
        <p className={`stat-change ${changeDir}`}>{change}</p>
      )}
    </div>
  );
}
