# FinFlow — Finance Dashboard

A clean, interactive personal finance dashboard built with **React** and **Chart.js**.

---

## Features Implemented

- [x] Dashboard Overview with Summary Cards (Balance, Income, Expenses, Savings Rate)
- [x] Time-Based Visualization — Balance Trend line chart (7-month view)
- [x] Categorical Visualization — Spending Breakdown doughnut chart
- [x] Transaction List with date, amount, category, and type
- [x] Transaction Filtering — All / Income / Expense tabs
- [x] Transaction Sorting & Search — sort by date or amount, live search
- [x] Role-Based UI — Admin (add/edit/delete) vs Viewer (read-only)
- [x] Insights Section — category breakdown, key observations, monthly comparison
- [x] State Management — React Context + useReducer (no external library needed)
- [x] Responsive Design — works on mobile, tablet, and desktop

---

## Tech Stack

| Layer         | Choice                        |
|---------------|-------------------------------|
| Framework     | React 18                      |
| State         | React Context + useReducer    |
| Charts        | Chart.js + react-chartjs-2    |
| Styling       | Plain CSS with CSS variables  |
| Data          | Static mock data (no backend) |

---

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx / .css          — navigation + role switcher
│   ├── Header.jsx / .css           — top bar with search
│   ├── StatCard.jsx / .css         — reusable summary card
│   ├── AddTransactionModal.jsx / .css  — add / edit form modal
│   └── charts/
│       ├── BalanceTrendChart.jsx   — line chart (time-based)
│       ├── SpendingBreakdownChart.jsx — doughnut (categorical)
│       └── MonthlyComparisonChart.jsx — bar chart
├── context/
│   └── AppContext.jsx              — global state (Context + useReducer)
├── data/
│   └── mockData.js                 — mock transactions + chart data
├── pages/
│   ├── Dashboard.jsx / .css        — overview page
│   ├── Transactions.jsx / .css     — transaction list page
│   └── Insights.jsx / .css        — insights & analysis page
├── App.jsx                         — root component + page router
├── App.css                         — CSS variables + global reset
└── index.js                        — React entry point
```

---

## Setup & Installation

### Prerequisites
- Node.js v16 or higher
- npm v8 or higher

### Steps

```bash
# 1. Clone or download the project
git clone <your-repo-url>
cd finance-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app opens at **http://localhost:3000**

### Build for production
```bash
npm run build
```
Output goes to the `build/` folder — ready to deploy on Vercel, Netlify, or any static host.

---

## Role-Based UI

Switch roles using the **dropdown in the bottom-left sidebar**:

| Feature                  | Admin | Viewer |
|--------------------------|-------|--------|
| View dashboard           | ✅    | ✅     |
| View transactions        | ✅    | ✅     |
| View insights            | ✅    | ✅     |
| Add transaction          | ✅    | ❌     |
| Edit transaction         | ✅    | ❌     |
| Delete transaction       | ✅    | ❌     |

---

## State Management Approach

All application state is managed via a single **React Context** (`AppContext`) using `useReducer`. This avoids prop drilling without the overhead of Redux.

**State shape:**
```js
{
  transactions: [...],   // all transaction records
  role: 'admin',         // 'admin' | 'viewer'
  activePage: 'dashboard',
  filter: 'all',         // 'all' | 'income' | 'expense'
  sortBy: 'date-desc',
  search: '',
}
```

**Derived state** (computed via `useMemo`):
- `visibleTransactions` — filtered + sorted list
- `totals` — income, expense, balance
- `catTotals` — per-category expense totals

---

## Assumptions Made

- No backend or authentication — roles are toggled locally for demo purposes.
- All data is mock/static. Transactions persist only for the session.
- Currency is displayed in Indian Rupees (₹) with `en-IN` locale formatting.
- Chart historical data (Oct–Mar) is pre-seeded; Apr reflects live mock transactions.
