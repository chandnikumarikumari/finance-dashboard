import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import BalanceTrendChart from '../components/charts/BalanceTrendChart';
import SpendingBreakdownChart from '../components/charts/SpendingBreakdownChart';
import MonthlyComparisonChart from '../components/charts/MonthlyComparisonChart';
import AddTransactionModal from '../components/AddTransactionModal';
import { fmt, CAT_COLORS } from '../data/mockData';
import './Dashboard.css';

export default function Dashboard() {
  const { state, totals, actions } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  const savingsPct =
    totals.income > 0 ? Math.round((totals.balance / totals.income) * 100) : 0;

  const recent = [...state.transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  return (
    <div className="dashboard">
      {/* ── Stat Cards ── */}
      <div className="stat-grid">
        <StatCard
          icon="◈" iconColor="blue"
          label="Total Balance"
          value={fmt(totals.balance)}
          change="↑ 12.4% this month"
          changeDir="up"
        />
        <StatCard
          icon="↑" iconColor="green"
          label="Total Income"
          value={fmt(totals.income)}
          change="↑ 8.2% vs last month"
          changeDir="up"
        />
        <StatCard
          icon="↓" iconColor="red"
          label="Total Expenses"
          value={fmt(totals.expense)}
          change="↑ 3.1% vs last month"
          changeDir="down"
        />
        <StatCard
          icon="◉" iconColor="amber"
          label="Savings Rate"
          value={`${savingsPct}%`}
          change="of total income saved"
          changeDir="neutral"
        />
      </div>

      {/* ── Charts Row 1 ── */}
      <div className="charts-row-main">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Balance Trend</h3>
              <p className="card-sub">7-month overview</p>
            </div>
            {/* custom legend */}
            <div className="chart-legend">
              {[
                { label: 'Balance', color: '#6366f1' },
                { label: 'Income',  color: '#10b981' },
                { label: 'Expense', color: '#f43f5e' },
              ].map((l) => (
                <span key={l.label} className="legend-item">
                  <span className="legend-dot" style={{ background: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>
          <BalanceTrendChart />
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Spending Breakdown</h3>
              <p className="card-sub">By category</p>
            </div>
          </div>
          <SpendingBreakdownChart />
        </div>
      </div>

      {/* ── Charts Row 2 ── */}
      <div className="charts-row-secondary">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Monthly Comparison</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="chart-legend">
                <span className="legend-item"><span className="legend-dot" style={{ background: '#10b981' }} />Income</span>
                <span className="legend-item"><span className="legend-dot" style={{ background: '#f43f5e' }} />Expense</span>
              </div>
              {state.role === 'admin' && (
                <button className="add-btn" onClick={() => setModalOpen(true)}>+ Add</button>
              )}
            </div>
          </div>
          <MonthlyComparisonChart />
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Transactions</h3>
            <button
              className="text-link"
              onClick={() => actions.setPage('transactions')}
            >
              View all →
            </button>
          </div>
          <table className="mini-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((t) => (
                <tr key={t.id}>
                  <td>
                    <span className="tx-name">{t.desc}</span>
                    <span className="tx-date">{t.date}</span>
                  </td>
                  <td>
                    <span className="cat-pill">
                      <span
                        className="cat-dot"
                        style={{ background: CAT_COLORS[t.cat] || '#888' }}
                      />
                      {t.cat}
                    </span>
                  </td>
                  <td className={t.type === 'income' ? 'amount-pos' : 'amount-neg'}>
                    {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddTransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editData={null}
      />
    </div>
  );
}
