import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import Signup from "./pages/Signup.jsx";
=======
import AboutUs from "./pages/About.jsx";
import ContactUs from "./pages/Contactus.jsx";
import EmployerSignup from "./pages/EmployerSignup.jsx";
import { default as ExpertSignUp } from "./pages/ExpertSignup.jsx";
import Home from "./pages/Home.jsx";
>>>>>>> origin
import Login from "./pages/Login.jsx";
import VerifyEmailPage from "./pages/VerifyEmailPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Sidebar from "./components/Sidebar.jsx";
import PostJob from "./components/postJob.jsx";


function App() {
  return (
<<<<<<< HEAD
    <div className="min-h-screen flex overflow-hidden gap-1">
      <Sidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
        </Routes>
      </div>
=======
    <div className="">
      
      
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/expert" element={<ExpertHomePage />} /> */}
        <Route path="/expert/signup" element={<ExpertSignUp />} />
        <Route path="/employer/signup" element={<EmployerSignup/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Routes>
>>>>>>> origin
    </div>
  );
}

export default App;
