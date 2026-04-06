import React from 'react';
import { useApp } from '../context/AppContext';
import './Header.css';

const PAGE_TITLES = {
  dashboard:    'Dashboard Overview',
  transactions: 'Transactions',
  insights:     'Insights',
};

export default function Header() {
  const { state, actions } = useApp();

  return (
    <header className="header">
      <h1 className="header-title">{PAGE_TITLES[state.activePage]}</h1>

      <div className="header-right">
        <div className="search-wrapper">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search transactions..."
            value={state.search}
            onChange={(e) => actions.setSearch(e.target.value)}
          />
          {state.search && (
            <button className="search-clear" onClick={() => actions.setSearch('')}>
              ✕
            </button>
          )}
        </div>

        <div className="header-avatar">JD</div>
      </div>
    </header>
  );
}
