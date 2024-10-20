import { motion } from "framer-motion";
import { Loader, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import FloatShape from "../components/FloatShape";
import Input from "../components/Input";
import AuthStore from "../store/AuthStore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = AuthStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log("login successfully");
    } catch (error) {
      console.log(error);
    }
  };

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



    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-center text-transparent">
          Create Account
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            icon={Mail}
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
          />
          <Input
            icon={Lock}
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
          />
          {error && <p className="text-red-500 text-sm mb-6">{error}</p>}
          <div className="flex items-center mb-6">
            <Link
              to="/forgot-password"
              className="text-green-400 hover:underline text-sm"
            >
              Forgot Password?
            </Link>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-gray-900 p-3 rounded-md font-bold"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className=" animate-spin mx-auto" size={16} />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
      </div>
      <div className="p-8 bg-gray-900 bg-opacity-50 rounded-b-2xl text-center">
        <p className="text-gray-200 text-sm">
          {`Don't have an account ? `}
          <Link to="/signup" className="text-green-400 hover:underline">
            SignUp
          </Link>
        </p>
      </div>
    </motion.div>
    </div>
  );
}

export default Login;
