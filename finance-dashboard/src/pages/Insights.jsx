import React from 'react';
import { useApp } from '../context/AppContext';
import { fmt, CAT_COLORS } from '../data/mockData';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { monthlyData } from '../data/mockData';
import './Insights.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Insights() {
  const { totals, catTotals, state } = useApp();

  const savings    = totals.balance;
  const savingsPct = totals.income > 0 ? Math.round((savings / totals.income) * 100) : 0;
  const topCat     = catTotals[0] || ['None', 0];
  const topCatPct  = totals.expense > 0 ? Math.round((topCat[1] / totals.expense) * 100) : 0;

  const barData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Income',
        data: monthlyData.income,
        backgroundColor: 'rgba(16,185,129,0.75)',
        borderRadius: 5,
        barPercentage: 0.55,
      },
      {
        label: 'Expense',
        data: monthlyData.expense,
        backgroundColor: 'rgba(244,63,94,0.75)',
        borderRadius: 5,
        barPercentage: 0.55,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e2333',
        titleColor: '#e2e8f0',
        bodyColor: '#94a3b8',
        borderColor: '#2e3a5c',
        borderWidth: 1,
        callbacks: {
          label: (ctx) => `  ${ctx.dataset.label}: ₹${ctx.raw.toLocaleString('en-IN')}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748b', font: { size: 11 } },
      },
      y: {
        grid: { color: 'rgba(46,58,92,0.4)' },
        ticks: {
          color: '#64748b',
          font: { size: 11 },
          callback: (v) => '₹' + (v / 1000).toFixed(0) + 'k',
        },
      },
    },
  };

  const INSIGHT_CARDS = [
    {
      icon: '↑',
      color: '#f43f5e',
      bg: 'rgba(244,63,94,0.12)',
      title: 'Top Spending Category',
      desc: `${topCat[0]} makes up ${topCatPct}% of total expenses at ${fmt(topCat[1])}. Consider reviewing this area.`,
    },
    {
      icon: '◎',
      color: '#10b981',
      bg: 'rgba(16,185,129,0.12)',
      title: 'Savings Rate',
      desc: `You're saving ${savingsPct}% of your income. ${
        savingsPct >= 20
          ? 'Great! You exceed the recommended 20%.'
          : 'Try to reach at least 20% for healthy finances.'
      }`,
    },
    {
      icon: '⇄',
      color: '#6366f1',
      bg: 'rgba(99,102,241,0.12)',
      title: 'Transaction Activity',
      desc: `${state.transactions.filter((t) => t.type === 'expense').length} expenses and ${
        state.transactions.filter((t) => t.type === 'income').length
      } income entries recorded across all time.`,
    },
    {
      icon: '◉',
      color: '#f59e0b',
      bg: 'rgba(245,158,11,0.12)',
      title: 'Monthly Balance',
      desc: `Net balance: ${fmt(savings)}. Your income ${
        savings >= 0 ? 'exceeds' : 'falls below'
      } expenses by ${fmt(Math.abs(savings))}.`,
    },
  ];

  return (
    <div className="insights-page">

      {/* Key insight cards */}
      <div className="insights-top">

        {/* Category breakdown */}
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: 18 }}>Spending by Category</h3>
          {catTotals.length === 0 ? (
            <p className="no-data">No expense data.</p>
          ) : (
            catTotals.slice(0, 7).map(([cat, amt]) => {
              const pct = totals.expense > 0 ? Math.round((amt / totals.expense) * 100) : 0;
              return (
                <div className="cat-row" key={cat}>
                  <div className="cat-row-top">
                    <span className="cat-name">
                      <span
                        className="cat-dot"
                        style={{ background: CAT_COLORS[cat] || '#888' }}
                      />
                      {cat}
                    </span>
                    <span className="cat-info">
                      {fmt(amt)}
                      <span className="cat-pct">({pct}%)</span>
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${pct}%`, background: CAT_COLORS[cat] || '#888' }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Insights list */}
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: 18 }}>Key Insights</h3>
          <div className="insight-list">
            {INSIGHT_CARDS.map((ins) => (
              <div className="insight-item" key={ins.title}>
                <div
                  className="insight-icon"
                  style={{ background: ins.bg, color: ins.color }}
                >
                  {ins.icon}
                </div>
                <div className="insight-body">
                  <p className="insight-title">{ins.title}</p>
                  <p className="insight-desc">{ins.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7-month bar chart */}
      <div className="card">
        <div className="card-header-row">
          <div>
            <h3 className="card-title">Income vs Expense — 7 Month View</h3>
            <p className="card-sub">Monthly breakdown comparison</p>
          </div>
          <div className="chart-legend">
            <span className="legend-item">
              <span className="legend-dot" style={{ background: '#10b981' }} />Income
            </span>
            <span className="legend-item">
              <span className="legend-dot" style={{ background: '#f43f5e' }} />Expense
            </span>
          </div>
        </div>
        <div style={{ position: 'relative', height: 230 }}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

    </div>
  );
}
