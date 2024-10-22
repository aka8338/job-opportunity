import { useState } from 'react';
import { Link } from 'react-router-dom';

const EmployerDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-100 text-black p-4 flex justify-between items-center">
        <div className="flex items-center">
          {/* Circular Profile Picture */}
          <img
            src="https://via.placeholder.com/40" // Placeholder image, replace with user's profile image
            alt="User Profile"
            className="w-10 h-10 rounded-full border-2 border-blue-500 mr-2"
          />
          <div className="text-3xl font-bold">Employer Dashboard</div>
        </div>

        <nav className="flex items-center">
          <div className="hidden md:flex space-x-4">
            <ul className="flex space-x-4">
              <li><Link to="#" className="hover:text-green-600 text-2xl">Home</Link></li>
              <li><Link to="#" className="hover:text-green-600 text-2xl">Post Job</Link></li>
              <li><Link to="#" className="hover:text-green-600 text-2xl">Applicants</Link></li>
              <li><Link to="/profile" className="hover:text-green-600 text-2xl">Profile</Link></li>
              <li><Link to="#" className="hover:text-green-600 text-2xl">Posted Jobs</Link></li>
            </ul>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-2xl"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? '✖️' : '☰'} {/* Change icon based on state */}
          </button>
        </nav>
      </header>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-slate-200 p-4">
          <ul className="flex flex-col space-y-2">
            <li><Link to="#" className="block hover:text-green-600 text-xl">Home</Link></li>
            <li><Link to="#" className="block hover:text-green-600 text-xl">Post Job</Link></li>
            <li><Link to="#" className="block hover:text-green-600 text-xl">Applicants</Link></li>
            <li><Link to="/profile" className="block hover:text-green-600 text-xl">Profile</Link></li>
            <li><Link to="#" className="block hover:text-green-600 text-xl">Posted Jobs</Link></li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome, Employer!</h1>
        <p className="text-lg text-gray-700 leading-relaxed sm:text-xl md:text-2xl max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
          We are glad to have you onboard! This platform empowers employers like you to connect with talented applicants, 
          post job openings, and manage your hiring process effortlessly. Explore the features designed to streamline your 
          recruitment efforts and enhance your organizational impact.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center">
            <img src="../../public/images/expert.webp" alt="Illustration 1" className="w-full" />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center">
            <img src="../../public/images/expert1.jpg" alt="Illustration 2" className="w-full" />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center">
            <img src="../../public/images/expert2.jpg" alt="Illustration 3" className="w-full" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-600 text-white p-4 text-center">
        <p>&copy; 2024 Employer Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EmployerDashboard;
