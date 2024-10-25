import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-100 shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Job<span className="text-teal-500">Finder</span>
          </h1>
          <span className="text-sm text-gray-500 ml-2">Primary</span>
        </div>

        {/* Hamburger Icon for Small Screens */}
        <button
          className="lg:hidden text-gray-500 hover:text-gray-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`flex-col lg:flex lg:flex-row lg:space-x-8 absolute lg:static bg-gray-100 lg:bg-transparent transition-all duration-300 ${isOpen ? 'top-16 left-0 w-full z-10' : 'hidden lg:flex'}`}>
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
            <Link to="/" className="text-teal-500 font-semibold">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-teal-500">
              About
            </Link>
            <a href="/jobs" className="text-gray-700 hover:text-teal-500">
              Jobs
            </a>
            <a href="/post-vacancy" className="text-gray-700 hover:text-teal-500">
              Post Vacancy
            </a>
            <Link to="/contact" className="text-gray-700 hover:text-teal-500">
              Contact
            </Link>
          </div>

          {/* Dark Mode Toggle (Icon placeholder) */}
          <button className="text-gray-500 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8-9h1m-16 0H3m15.364 6.364l-.707-.707m-12.02-.707l-.707.707m12.02-12.02l-.707.707m-12.02-.707l-.707.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
              <Link to='/login'>Login</Link>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
