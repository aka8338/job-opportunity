import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import ApplicantStatus from "./components/applicantStatus.jsx";
import PostJob from "./components/postJob.jsx";
import AboutUs from "./pages/About.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EmployerSignup from "./pages/EmployerSignup.jsx";
import HomePage from "./pages/HomePage.jsx";
import { default as ExpertSignUp } from "./pages/ExpertSignup.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ProfilePage from "./pages/Profile.jsx";
import VerifyEmailPage from "./pages/VerifyEmailPage.jsx";
import AuthStore from "./store/AuthStore";
import ApplyJob from "./components/applyJob.jsx";

function App() {
  const { isAuthenticated } = AuthStore();

  return (
    <div className="dark">
      <div className="bg-white text-black dark:bg-gray-800 dark:text-white min-h-screen flex flex-col overflow-hidden space-y-16">
        <NavBar />
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <HomePage /> : <Home />}
            />
            {/* {Job routes } */}
            <Route path="/jobs" element={<Dashboard />} />
            <Route path="/postJob" element={<PostJob />} />
            <Route path="/applyJob/:jobId" element={<ApplyJob />} />
            <Route
              path="/applicantStatus/:jobId"
              element={<ApplicantStatus />}
            />
            {/* {Auth routes} */}
            <Route path="/expert/signup" element={<ExpertSignUp />} />
            <Route path="/employer/signup" element={<EmployerSignup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path={`/verify`} element={<VerifyEmailPage />} />

            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
