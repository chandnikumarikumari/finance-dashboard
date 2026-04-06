import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useApp } from '../../context/AppContext';
import { CAT_COLORS } from '../../data/mockData';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SpendingBreakdownChart() {
  const { catTotals, totals } = useApp();
  const top = catTotals.slice(0, 6);

  const colors = top.map((c) => CAT_COLORS[c[0]] || '#888');

  const data = {
    labels: top.map((c) => c[0]),
    datasets: [
      {
        data: top.map((c) => c[1]),
        backgroundColor: colors,
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e2333',
        titleColor: '#e2e8f0',
        bodyColor: '#94a3b8',
        borderColor: '#2e3a5c',
        borderWidth: 1,
        callbacks: {
          label: (ctx) =>
            `  ₹${ctx.raw.toLocaleString('en-IN')} (${
              totals.expense > 0
                ? Math.round((ctx.raw / totals.expense) * 100)
                : 0
            }%)`,
        },
      },
    },
  };

  if (top.length === 0) {
    return (
      <p style={{ color: 'var(--text3)', fontSize: 13, textAlign: 'center', padding: '40px 0' }}>
        No expense data available.
      </p>
    );
  }

  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: '190px' }}>
        <Doughnut data={data} options={options} />
      </div>

      {/* Custom legend */}
      <div style={{ marginTop: 14 }}>
        {top.map(([cat, amt]) => (
          <div
            key={cat}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '4px 0',
              fontSize: 12,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: CAT_COLORS[cat] || '#888',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <span style={{ color: 'var(--text2)' }}>{cat}</span>
            </span>
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>
              {totals.expense > 0 ? Math.round((amt / totals.expense) * 100) : 0}%
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
