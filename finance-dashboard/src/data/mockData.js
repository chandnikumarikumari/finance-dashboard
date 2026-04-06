export const initialTransactions = [
  { id: 1,  date: '2026-04-01', desc: 'Monthly Salary',      amount: 85000, type: 'income',  cat: 'Salary'        },
  { id: 2,  date: '2026-04-02', desc: 'Grocery Store',       amount: 3200,  type: 'expense', cat: 'Food'          },
  { id: 3,  date: '2026-04-03', desc: 'Uber Ride',           amount: 450,   type: 'expense', cat: 'Transport'     },
  { id: 4,  date: '2026-04-04', desc: 'Freelance Project',   amount: 18000, type: 'income',  cat: 'Freelance'     },
  { id: 5,  date: '2026-04-04', desc: 'Netflix Subscription',amount: 649,   type: 'expense', cat: 'Entertainment' },
  { id: 6,  date: '2026-04-05', desc: 'Electricity Bill',    amount: 1800,  type: 'expense', cat: 'Utilities'     },
  { id: 7,  date: '2026-04-05', desc: 'Zomato Order',        amount: 780,   type: 'expense', cat: 'Food'          },
  { id: 8,  date: '2026-04-06', desc: 'Stock Investment',    amount: 15000, type: 'expense', cat: 'Investment'    },
  { id: 9,  date: '2026-03-28', desc: 'Salary Advance',      amount: 10000, type: 'income',  cat: 'Salary'        },
  { id: 10, date: '2026-03-25', desc: 'Shopping Mall',       amount: 5400,  type: 'expense', cat: 'Shopping'      },
  { id: 11, date: '2026-03-22', desc: 'Doctor Visit',        amount: 800,   type: 'expense', cat: 'Health'        },
  { id: 12, date: '2026-03-20', desc: 'Internet Bill',       amount: 999,   type: 'expense', cat: 'Utilities'     },
  { id: 13, date: '2026-03-15', desc: 'Monthly Salary',      amount: 85000, type: 'income',  cat: 'Salary'        },
  { id: 14, date: '2026-03-10', desc: 'Restaurant Dinner',   amount: 1850,  type: 'expense', cat: 'Food'          },
  { id: 15, date: '2026-03-08', desc: 'Freelance Design',    amount: 12000, type: 'income',  cat: 'Freelance'     },
  { id: 16, date: '2026-02-28', desc: 'Monthly Salary',      amount: 85000, type: 'income',  cat: 'Salary'        },
  { id: 17, date: '2026-02-20', desc: 'Shopping Online',     amount: 4200,  type: 'expense', cat: 'Shopping'      },
  { id: 18, date: '2026-02-15', desc: 'Gym Membership',      amount: 1200,  type: 'expense', cat: 'Health'        },
  { id: 19, date: '2026-02-10', desc: 'Freelance Writing',   amount: 8000,  type: 'income',  cat: 'Freelance'     },
  { id: 20, date: '2026-02-05', desc: 'Food Delivery',       amount: 1200,  type: 'expense', cat: 'Food'          },
];

export const monthlyData = {
  labels:  ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
  income:  [95000, 102000, 88000, 115000, 105000, 107000, 113000],
  expense: [45000,  52000, 61000,  48000,  38000,  45000,  34078],
};

export const CATEGORIES = [
  'Food', 'Transport', 'Shopping', 'Health',
  'Entertainment', 'Utilities', 'Salary', 'Freelance', 'Investment',
];

export const CAT_COLORS = {
  Food:          '#f59e0b',
  Transport:     '#6366f1',
  Shopping:      '#ec4899',
  Health:        '#10b981',
  Entertainment: '#8b5cf6',
  Utilities:     '#06b6d4',
  Salary:        '#34d399',
  Freelance:     '#22d3ee',
  Investment:    '#a78bfa',
};

export const fmt = (n) =>
  '₹' + Number(n).toLocaleString('en-IN');
