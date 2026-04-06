import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { initialTransactions } from '../data/mockData';

// ─── Initial State ───────────────────────────────────────────────────────────
const initialState = {
  transactions: initialTransactions,
  role:         'admin',      // 'admin' | 'viewer'
  activePage:   'dashboard',  // 'dashboard' | 'transactions' | 'insights'
  filter:       'all',        // 'all' | 'income' | 'expense'
  sortBy:       'date-desc',  // 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'
  search:       '',
};

// ─── Reducer ─────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };

    case 'SET_PAGE':
      return { ...state, activePage: action.payload };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'SET_SORT':
      return { ...state, sortBy: action.payload };

    case 'SET_SEARCH':
      return { ...state, search: action.payload };

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Derived: filtered + sorted transactions
  const visibleTransactions = useMemo(() => {
    let list = [...state.transactions];

    if (state.filter !== 'all') {
      list = list.filter((t) => t.type === state.filter);
    }

    if (state.search.trim()) {
      const q = state.search.toLowerCase();
      list = list.filter(
        (t) =>
          t.desc.toLowerCase().includes(q) ||
          t.cat.toLowerCase().includes(q)
      );
    }

    switch (state.sortBy) {
      case 'date-asc':     list.sort((a, b) => a.date.localeCompare(b.date));  break;
      case 'amount-desc':  list.sort((a, b) => b.amount - a.amount);           break;
      case 'amount-asc':   list.sort((a, b) => a.amount - b.amount);           break;
      default:             list.sort((a, b) => b.date.localeCompare(a.date));  break;
    }

    return list;
  }, [state.transactions, state.filter, state.search, state.sortBy]);

  // Derived: totals
  const totals = useMemo(() => {
    const income  = state.transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = state.transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [state.transactions]);

  // Derived: category totals (expenses only)
  const catTotals = useMemo(() => {
    const map = {};
    state.transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => { map[t.cat] = (map[t.cat] || 0) + t.amount; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [state.transactions]);

  // Actions
  const actions = {
    setRole:    (role)  => dispatch({ type: 'SET_ROLE',    payload: role }),
    setPage:    (page)  => dispatch({ type: 'SET_PAGE',    payload: page }),
    setFilter:  (f)     => dispatch({ type: 'SET_FILTER',  payload: f }),
    setSort:    (s)     => dispatch({ type: 'SET_SORT',    payload: s }),
    setSearch:  (q)     => dispatch({ type: 'SET_SEARCH',  payload: q }),
    addTransaction: (tx) =>
      dispatch({ type: 'ADD_TRANSACTION', payload: { ...tx, id: Date.now() } }),
    editTransaction: (tx) =>
      dispatch({ type: 'EDIT_TRANSACTION', payload: tx }),
    deleteTransaction: (id) =>
      dispatch({ type: 'DELETE_TRANSACTION', payload: id }),
  };

  return (
    <AppContext.Provider value={{ state, visibleTransactions, totals, catTotals, actions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
