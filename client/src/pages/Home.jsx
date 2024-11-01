import { Link } from "react-router-dom";
const sectors = [
  {
    name: "Natural Science",
    icon: "../../public/images/natural-science.webp",
    positions: 37,
  },
  {
    name: "Business",
    icon: "../../public/images/business.webp",
    positions: 282,
  },
  {
    name: "Creative Arts",
    icon: "../../public/images/creative art.webp",
    positions: 14,
  },
  {
    name: "Education",
    icon: "../../public/images/education.png",
    positions: 84,
  },
  {
    name: "Hospitality",
    icon: "../../public/images/hospitality.webp",
    positions: 17,
  },
  {
    name: "Low and Medium Skilled Worker",
    icon: "../../public/images/worker.webp",
    positions: 37,
  },
  {
    name: "Transportation & Logistics",
    icon: "../../public/images/transportation.webp",
    positions: 29,
  },
  {
    name: "Engineering",
    icon: "../../public/images/engineer.webp",
    positions: 112,
  },
  {
    name: "Finance",
    icon: "../../public/images/finance.webp",
    positions: 156,
  },
  {
    name: "Legal Services",
    icon: "../../public/images/legal.webp",
    positions: 16,
  },
  {
    name: "ICT",
    icon: "../../public/images/ict.png",
    positions: 28,
  },
  {
    name: "Health Care",
    icon: "../../public/images/health.webp",
    positions: 62,
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">
          All Ethiopian Jobs in One Place.
        </h1>
        <p className="text-xl">Find career opportunities in Ethiopia</p>
      </div>

      <div className="flex flex-col items-center mt-12">
        <p className="text-lg font-semibold mb-4">Sign Up As</p>

        <div className="flex space-x-4">
          <Link
            to="/expert/signup"
            className=" bg-teal-500 text-white px-6 py-3 rounded-xl shadow-lg
         hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 mb-20 mr-2"
          >
            Expert
          </Link>
          <h1 className="text-xl text-red-400">or</h1>
          <Link
            to="/employer/signup"
            className=" bg-teal-500 text-white px-6 py-3 rounded-xl shadow-lg
         hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 mb-20"
          >
            Employer
          </Link>
        </div>
      </div>

      <div className="flex justify-center gap-8">
        <div className="w-1/4 flex justify-center">
          <img
            src="../../public/images/job.avif"
            alt="Illustration 1"
            className="w-full"
          />
        </div>
        <div className="w-1/4 flex justify-center">
          <img
            src="../../public/images/job1.jpg"
            alt="Illustration 2"
            className="w-full"
          />
        </div>
        <div className="w-1/4 flex justify-center">
          <img
            src="../../public/images/job2.jpg"
            alt="Illustration 3"
            className="w-full"
          />
        </div>
        <div className="w-1/4 flex justify-center">
          <img
            src="../../public/images/job3.jpg"
            alt="Illustration 4"
            className="w-full"
          />
        </div>
      </div>

      <div className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Career Sectors</h2>
          <p className="text-lg mb-8">
            Based on the local labor market trend in Ethiopia we categorize our
            vacancies into fourteen sectors
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sectors.map((sector, index) => (
              <div
                key={index}
                className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={sector.icon}
                  alt={sector.name}
                  className="h-16 w-16 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">{sector.name}</h3>
                <p>{sector.positions} Open positions</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <h1 className="text-2xl font-bold mb-4">Job Finder</h1>
            <p>
              Find the best job opportunities in Ethiopia. Your future starts
              here!
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul>
              <li className="mb-2">
                <Link to="/" className="hover:text-gray-800">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <a href="/jobs" className="hover:text-gray-800">
                  Browse Jobs
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="hover:text-gray-800">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="hover:text-gray-800">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media and Contact Info */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <Link
                to="#"
                aria-label="Facebook"
                className="hover:text-gray-800"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.731 0-1.325.594-1.325 1.325v21.351c0 .73.594 1.324 1.325 1.324h11.494v-9.293h-3.121v-3.622h3.121v-2.671c0-3.097 1.894-4.787 4.66-4.787 1.325 0 2.463.099 2.795.143v3.24h-1.917c-1.503 0-1.796.715-1.796 1.764v2.311h3.591l-.467 3.622h-3.124v9.293h6.116c.73 0 1.324-.594 1.324-1.324v-21.35c0-.731-.594-1.325-1.324-1.325z" />
                </svg>
              </Link>
              <Link to="#" aria-label="Twitter" className="hover:text-gray-800">
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.955-2.178-1.55-3.594-1.55-2.719 0-4.924 2.205-4.924 4.924 0 .386.044.762.128 1.124-4.092-.205-7.719-2.166-10.148-5.144-.424.728-.666 1.574-.666 2.476 0 1.709.869 3.217 2.191 4.101-.807-.026-1.567-.248-2.228-.616v.062c0 2.386 1.698 4.374 3.946 4.828-.414.112-.85.172-1.299.172-.317 0-.626-.031-.928-.089.627 1.956 2.444 3.379 4.597 3.419-1.683 1.319-3.808 2.104-6.115 2.104-.398 0-.79-.023-1.177-.069 2.18 1.397 4.768 2.211 7.557 2.211 9.054 0 14.002-7.502 14.002-14.002 0-.213-.005-.426-.014-.637.961-.694 1.796-1.562 2.457-2.549z" />
                </svg>
              </Link>
              <Link
                to="#"
                aria-label="LinkedIn"
                className="hover:text-gray-800"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.23 0h-20.46c-.978 0-1.77.792-1.77 1.77v20.459c0 .978.792 1.771 1.77 1.771h20.459c.978 0 1.77-.793 1.77-1.771v-20.459c0-.978-.792-1.77-1.77-1.77zm-13.539 20.248h-3.084v-10.447h3.084v10.447zm-1.542-11.896c-.987 0-1.785-.799-1.785-1.786s.798-1.785 1.785-1.785 1.785.798 1.785 1.785-.798 1.786-1.785 1.786zm13.539 11.896h-3.084v-5.66c0-1.349-.027-3.086-1.882-3.086-1.884 0-2.173 1.471-2.173 2.988v5.758h-3.084v-10.447h2.961v1.425h.041c.412-.78 1.419-1.602 2.92-1.602 3.123 0 3.698 2.056 3.698 4.729v5.895z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          &copy; {new Date().getFullYear()} Job Finder. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
