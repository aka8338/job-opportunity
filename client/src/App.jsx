import { Route, Routes } from "react-router-dom";
import AboutUs from "./pages/About.jsx";
import ContactUs from "./pages/Contactus.jsx";
import EmployerSignup from "./pages/EmployerSignup.jsx";
import { default as ExpertSignUp } from "./pages/ExpertSignup.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import VerifyEmailPage from "./pages/VerifyEmailPage.jsx";


function App() {
  return (
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
    </div>
  );
}

export default App;
