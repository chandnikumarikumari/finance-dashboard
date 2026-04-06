import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { monthlyData } from '../../data/mockData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MonthlyComparisonChart() {
  const data = {
    labels: monthlyData.labels.slice(-5),
    datasets: [
      {
        label: 'Income',
        data: monthlyData.income.slice(-5),
        backgroundColor: 'rgba(16,185,129,0.75)',
        borderRadius: 5,
        barPercentage: 0.6,
      },
      {
        label: 'Expense',
        data: monthlyData.expense.slice(-5),
        backgroundColor: 'rgba(244,63,94,0.75)',
        borderRadius: 5,
        barPercentage: 0.6,
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

  return (
    <div style={{ position: 'relative', width: '100%', height: '200px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}
