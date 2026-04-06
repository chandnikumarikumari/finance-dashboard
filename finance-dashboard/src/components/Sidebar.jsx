import React from 'react';
import { useApp } from '../context/AppContext';
import './Sidebar.css';

const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Dashboard',     icon: '⊞' },
  { id: 'transactions', label: 'Transactions',  icon: '⇄' },
  { id: 'insights',     label: 'Insights',      icon: '◉' },
];

export default function Sidebar() {
  const { state, actions } = useApp();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        Fin<span>Flow</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${state.activePage === item.id ? 'active' : ''}`}
            onClick={() => actions.setPage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="role-switcher">
          <p className="role-label">Role</p>
          <select
            className="role-select"
            value={state.role}
            onChange={(e) => actions.setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">JD</div>
          <div className="user-info">
            <p className="user-name">John Doe</p>
            <p className="user-role">{state.role === 'admin' ? 'Administrator' : 'Viewer'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
