import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import './AddTransactionModal.css';

const EMPTY_FORM = {
  desc:   '',
  amount: '',
  type:   'expense',
  cat:    'Food',
  date:   new Date().toISOString().split('T')[0],
};

/**
 * Props:
 *   isOpen     – boolean
 *   onClose    – () => void
 *   editData   – transaction object | null  (null = add mode)
 */
export default function AddTransactionModal({ isOpen, onClose, editData }) {
  const { actions } = useApp();
  const [form, setForm]     = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (editData) {
      setForm({
        desc:   editData.desc,
        amount: editData.amount,
        type:   editData.type,
        cat:    editData.cat,
        date:   editData.date,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const change = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.desc.trim())         e.desc   = 'Description is required';
    if (!form.amount || Number(form.amount) <= 0) e.amount = 'Enter a valid amount';
    if (!form.date)                e.date   = 'Date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const tx = { ...form, amount: parseFloat(form.amount) };
    if (editData) {
      actions.editTransaction({ ...tx, id: editData.id });
    } else {
      actions.addTransaction(tx);
    }
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2 className="modal-title">{editData ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label">Description</label>
          <input
            className={`form-input ${errors.desc ? 'input-error' : ''}`}
            placeholder="e.g. Grocery Shopping"
            value={form.desc}
            onChange={change('desc')}
          />
          {errors.desc && <p className="error-msg">{errors.desc}</p>}
        </div>

        {/* Amount + Type */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Amount (₹)</label>
            <input
              type="number"
              min="0"
              className={`form-input ${errors.amount ? 'input-error' : ''}`}
              placeholder="0"
              value={form.amount}
              onChange={change('amount')}
            />
            {errors.amount && <p className="error-msg">{errors.amount}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-input" value={form.type} onChange={change('type')}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        {/* Category + Date */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-input" value={form.cat} onChange={change('cat')}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              className={`form-input ${errors.date ? 'input-error' : ''}`}
              value={form.date}
              onChange={change('date')}
            />
            {errors.date && <p className="error-msg">{errors.date}</p>}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save"   onClick={handleSave}>
            {editData ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
}
