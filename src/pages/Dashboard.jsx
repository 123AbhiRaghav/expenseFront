import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExpenses, addExpense, deleteExpense, updateExpense } from "../services/api";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [receipt, setReceipt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await getExpenses();
        setExpenses(res);
      } catch (err) {
        console.error(err.message);
        navigate('/login');
      }
    };

    fetchExpenses();
  }, [navigate]);

  const handleAddOrUpdateExpense = async (e) => {
    e.preventDefault();

    try {
      const formattedDate = date ? new Date(date).toISOString().split('T')[0] : '';

      if (isEditing) {
        await updateExpense(editId, { description, amount, category, date: formattedDate, paymentMethod, receipt });
        setIsEditing(false);
        setEditId(null);
      } else {
        await addExpense({ description, amount, category, date: formattedDate, paymentMethod, receipt });
      }

      // Clear input fields after adding or updating expense
      setDescription('');
      setAmount('');
      setCategory('');
      setDate('');
      setPaymentMethod('');
      setReceipt('');
      const res = await getExpenses();
      setExpenses(res);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEditExpense = (expense) => {
    setIsEditing(true);
    setEditId(expense._id);
    setDescription(expense.description);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(expense.date ? new Date(expense.date).toISOString().split('T')[0] : '');
    setPaymentMethod(expense.paymentMethod);
    setReceipt(expense.receipt);
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      const res = await getExpenses();
      setExpenses(res);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  return (
    <div className="flex flex-col md:flex-row items-start justify-between p-4 bg-gray-100 h-screen overflow-auto gap-4">
      {/* Add Expense Form */}
      <div className="w-full md:w-1/3 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Expense' : 'Add Expense'}</h2>
        <form onSubmit={handleAddOrUpdateExpense} className="flex flex-col gap-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              id="description"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              id="amount"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              id="category"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
            <input
              type="text"
              id="paymentMethod"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              placeholder="Enter payment method"
            />
          </div>
          <div>
            <label htmlFor="receipt" className="block text-sm font-medium text-gray-700">Receipt URL</label>
            <input
              type="text"
              id="receipt"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3"
              value={receipt}
              onChange={(e) => setReceipt(e.target.value)}
              placeholder="Enter receipt URL"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
          >
            {isEditing ? 'Update Expense' : 'Add Expense'}
          </button>
        </form>
      </div>

      {/* Expense List */}
      <div className="w-full md:w-2/3 p-4 bg-white shadow-lg rounded-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Expense List</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map(expense => (
              <tr key={expense._id}>
                <td className="py-3 px-4 text-sm text-gray-800">{expense.description}</td>
                <td className="py-3 px-4 text-sm text-gray-800">${expense.amount}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{expense.category}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{new Date(expense.date).toISOString().split('T')[0]}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{expense.paymentMethod}</td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {expense.receipt ? <a href={expense.receipt} className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">View Receipt</a> : 'N/A'}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  <button
                    onClick={() => handleEditExpense(expense)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteExpense(expense._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Total Expenses: ${totalExpenses}</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

