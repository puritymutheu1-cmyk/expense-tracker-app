import { createContext, useState, useCallback, useContext } from "react";

export const ExpenseContext = createContext(null);

const MOCK_INCOMES = [
  { _id: "i1", title: "Monthly Salary",   amount: 85000, category: "salary",    date: "2025-05-01", description: "May salary" },
  { _id: "i2", title: "Freelance Project", amount: 25000, category: "freelance", date: "2025-05-05", description: "Website design" },
  { _id: "i3", title: "Stock Dividends",  amount: 12000, category: "investment",date: "2025-04-28", description: "Q1 dividends" },
  { _id: "i4", title: "Rental Income",    amount: 18000, category: "rental",    date: "2025-04-01", description: "Apartment rent" },
];

const MOCK_EXPENSES = [
  { _id: "e1", title: "Rent Payment",     amount: 22000, category: "housing",       date: "2025-05-01", description: "Monthly rent" },
  { _id: "e2", title: "Grocery Shopping", amount: 8500,  category: "food",          date: "2025-05-03", description: "Supermarket" },
  { _id: "e3", title: "Electricity Bill", amount: 3200,  category: "utilities",     date: "2025-05-06", description: "KPLC bill" },
  { _id: "e4", title: "Netflix & Spotify",amount: 2100,  category: "entertainment", date: "2025-05-07", description: "Subscriptions" },
  { _id: "e5", title: "Fuel",             amount: 5000,  category: "transport",     date: "2025-05-08", description: "Full tank" },
  { _id: "e6", title: "Doctor Visit",     amount: 4500,  category: "healthcare",    date: "2025-04-20", description: "Check-up" },
];

export function ExpenseProvider({ children }) {
  const [incomes,  setIncomes]  = useState(MOCK_INCOMES);
  const [expenses, setExpenses] = useState(MOCK_EXPENSES);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  const fetchIncomes  = useCallback(() => {}, []);
  const fetchExpenses = useCallback(() => {}, []);

  const addIncome = useCallback((data) => {
    const newItem = { ...data, _id: "i" + Date.now() };
    setIncomes(prev => [newItem, ...prev]);
  }, []);

  const updateIncome = useCallback((id, data) => {
    setIncomes(prev => prev.map(i => i._id === id ? { ...i, ...data } : i));
  }, []);

  const deleteIncome = useCallback((id) => {
    setIncomes(prev => prev.filter(i => i._id !== id));
  }, []);

  const addExpense = useCallback((data) => {
    const newItem = { ...data, _id: "e" + Date.now() };
    setExpenses(prev => [newItem, ...prev]);
  }, []);

  const updateExpense = useCallback((id, data) => {
    setExpenses(prev => prev.map(e => e._id === id ? { ...e, ...data } : e));
  }, []);

  const deleteExpense = useCallback((id) => {
    setExpenses(prev => prev.filter(e => e._id !== id));
  }, []);

  const totalIncome  = incomes.reduce((s, i)  => s + i.amount, 0);
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
  const balance      = totalIncome - totalExpense;

  return (
    <ExpenseContext.Provider value={{
      incomes, expenses, loading, error,
      totalIncome, totalExpense, balance,
      fetchIncomes, addIncome, updateIncome, deleteIncome,
      fetchExpenses, addExpense, updateExpense, deleteExpense,
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpense = () => useContext(ExpenseContext);