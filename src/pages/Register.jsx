import { useState } from 'react';
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/users/register', formData);
      navigate("/login");
    } catch (err) {
      console.error("Error Message", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500">
      <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className=" p-1 block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name" 
              className="p-1 block w-full border-gray-950 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter your name here'
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="p-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email" 
              className="p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email here'
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="p-1 block text-sm font-medium text-gray-700">Gender</label>
            <select
              id="gender"
              name="gender"
              className="p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="p-1 block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password" 
              className="p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter your password here'
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
