import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import AddTransactionModal from '../components/AddTransactionModal';
import { fmt, CAT_COLORS } from '../data/mockData';
import './Transactions.css';

export default function Transactions() {
  const { state, visibleTransactions, actions } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData,  setEditData]  = useState(null);

  const openAdd  = ()     => { setEditData(null);  setModalOpen(true); };
  const openEdit = (tx)   => { setEditData(tx);    setModalOpen(true); };
  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      actions.deleteTransaction(id);
    }
  };

  return (
    <div className="transactions-page">

      {/* Viewer notice */}
      {state.role === 'viewer' && (
        <div className="viewer-notice">
          ⚠ You are in Viewer mode — read only. Switch to Admin to add or edit transactions.
        </div>
      )}

      {/* Controls bar */}
      <div className="tx-controls">
        <div className="tab-bar">
          {['all', 'income', 'expense'].map((f) => (
            <button
              key={f}
              className={`tab-btn ${state.filter === f ? 'active' : ''}`}
              onClick={() => actions.setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="tx-controls-right">
          <select
            className="sort-select"
            value={state.sortBy}
            onChange={(e) => actions.setSort(e.target.value)}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>

          {state.role === 'admin' && (
            <button className="add-btn-lg" onClick={openAdd}>
              + Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="tx-table-wrap">
        {visibleTransactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⇄</div>
            <p>No transactions match your filters.</p>
          </div>
        ) : (
          <table className="tx-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
                {state.role === 'admin' && <th style={{ textAlign: 'center' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {visibleTransactions.map((t) => (
                <tr key={t.id}>
                  <td className="date-cell">{t.date}</td>
                  <td className="desc-cell">{t.desc}</td>
                  <td>
                    <span className="cat-pill">
                      <span
                        className="cat-dot"
                        style={{ background: CAT_COLORS[t.cat] || '#888' }}
                      />
                      {t.cat}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${t.type}`}>{t.type}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <span className={t.type === 'income' ? 'amount-pos' : 'amount-neg'}>
                      {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                    </span>
                  </td>
                  {state.role === 'admin' && (
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className="action-btn edit"
                        onClick={() => openEdit(t)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(t.id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AddTransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editData={editData}
      />
    </div>
  );
}
