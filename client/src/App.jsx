import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import VerifyEmailPage from "./pages/VerifyEmailPage.jsx";

function App() {
  return (
    <div className="">
      
      
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/expert" element={<ExpertHomePage />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Routes>
    </div>
  );
}

export default App;
