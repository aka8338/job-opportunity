import { Route, Routes } from "react-router-dom";
import FloatShape from "./components/FloatShape";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import VerifyEmailPage from "./pages/VerifyEmailPage.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatShape
        color="bg-blue-400"
        size="w-64 h-64"
        left="10%"
        top="-5%"
        delay={0}
      />
      <FloatShape
        color="bg-red-400"
        size="w-48 h-48"
        left="70%"
        top="70%"
        delay={4}
      />
      <FloatShape
        color="bg-yellow-400"
        size="w-32 h-32"
        left="-10%"
        top="40%"
        delay={2}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Routes>
    </div>
  );
}

export default App;
