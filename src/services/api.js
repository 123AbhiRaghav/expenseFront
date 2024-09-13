import axios from 'axios';

const api = axios.create({
  baseURL: 'https://expenseserver-7clf.onrender.com', 
});


const getConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


export const getExpenses = async () => {
  try {
    const response = await api.get('/expenses', getConfig());
    return response.data;
  } catch (err) {
    console.error('Error fetching expenses', err);
    throw err;
  }
};


export const addExpense = async (expenseData) => {
  try {
    const response = await api.post('/expenses', expenseData, getConfig());
    return response.data;
  } catch (err) {
    console.error('Error adding expense', err);
    throw err;
  }
};


export const deleteExpense = async (id) => {
  try {
    const response = await api.delete(`/expenses/${id}`, getConfig());
    return response.data;
  } catch (err) {
    console.error('Error deleting expense', err);
    throw err;
  }
};


export const updateExpense = async (id, updatedExpenseData) => {
  try {
    const response = await api.put(`/expenses/${id}`, updatedExpenseData, getConfig());
    return response.data;
  } catch (err) {
    console.error('Error updating expense', err);
    throw err;
  }
};



export default api;
