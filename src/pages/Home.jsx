import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      className="relative min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center"
      style={{
        backgroundImage: `url('/expense.jpg')`, // Ensure this is in your public folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full bg-opacity-7 py-4">
        <div className="container mx-auto flex justify-between px-6 text-white">
          <Link to="/" className="text-lg font-semibold hover:text-gray-800">
            Home
          </Link>
          <Link to="/dashboard" className="text-lg font-semibold hover:text-gray-800">
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white p-8 bg-opacity-75 bg-gray-800 rounded-lg shadow-lg max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to Expense Manager</h1>
        <p className="text-lg mb-6">
          Please log in or register to manage your expenses effortlessly.
        </p>

        <div className="space-x-4">
          <Link
            to="/login"
            className="inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded transition-all duration-300 transform hover:scale-105"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="inline-block px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded transition-all duration-300 transform hover:scale-105"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
