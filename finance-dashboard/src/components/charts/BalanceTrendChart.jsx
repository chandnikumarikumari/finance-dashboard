import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale,
  PointElement, LineElement,
  Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { monthlyData } from '../../data/mockData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function BalanceTrendChart() {
  const balance = monthlyData.income.map((inc, i) => inc - monthlyData.expense[i]);

  const data = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Balance',
        data: balance,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.12)',
        fill: true,
        tension: 0.45,
        pointBackgroundColor: '#6366f1',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Income',
        data: monthlyData.income,
        borderColor: '#10b981',
        backgroundColor: 'transparent',
        tension: 0.45,
        pointRadius: 3,
        borderDash: [5, 4],
        pointHoverRadius: 5,
      },
      {
        label: 'Expense',
        data: monthlyData.expense,
        borderColor: '#f43f5e',
        backgroundColor: 'transparent',
        tension: 0.45,
        pointRadius: 3,
        borderDash: [5, 4],
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
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
          label: (ctx) =>
            `  ${ctx.dataset.label}: ₹${ctx.raw.toLocaleString('en-IN')}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(46,58,92,0.4)' },
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

  return (
    <div style={{ position: 'relative', width: '100%', height: '230px' }}>
      <Line data={data} options={options} />
    </div>
  );
}
