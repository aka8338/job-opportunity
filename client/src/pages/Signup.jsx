import { motion } from "framer-motion";
import { Building, Loader, Lock, Mail, UserRoundPen } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FloatShape from "../components/FloatShape";
import Input from "../components/Input";
import AuthStore from "../store/AuthStore";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    role: "expert", // default role is 'expert'  // we used it in order to register either expert or employer based on their role 
  });

  const { signup, error, isLoading } = AuthStore();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleRoleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      role: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.firstName,
        formData.lastName,
        formData.companyName, // companyName will be empty for experts
        formData.role
      );
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatShape color="bg-blue-400" size="w-64 h-64" left="10%" top="-5%" delay={0} />
      <FloatShape color="bg-red-400" size="w-48 h-48" left="70%" top="70%" delay={4} />
      <FloatShape color="bg-yellow-400" size="w-32 h-32" left="-10%" top="40%" delay={2} />

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
            <div className="mb-6">
              <label className="block text-gray-400 mb-2">Sign up as</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleRoleChange}
                className="w-full p-3 bg-gray-700 rounded-md text-white focus:outline-none"
              >
                <option value="expert">Expert</option>
                <option value="employer">Employer</option>
              </select>
            </div>

            {formData.role === "expert" ? (
              <>
                {/* Expert Sign Up Fields */}
                <Input
                  icon={UserRoundPen}
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                   <Input
                  icon={UserRoundPen}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <Input
                  icon={Mail}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </>
            ) : (
              <>
                {/* Employer Sign Up Fields */}
                <Input
                  icon={Building}
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
                <Input
                  icon={Mail}
                  type="email"
                  name="email"
                  placeholder="Company Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </>
            )}

            <Input
              icon={Lock}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Input
              icon={Lock}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />

            {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-gray-900 p-3 rounded-md font-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" size={16} />
              ) : (
                "Sign Up"
              )}
            </motion.button>
          </form>
        </div>
        <div className="flex justify-center items-center bg-gray-900 bg-opacity-50 p-4 text-gray-400 text-sm">
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-green-400 hover:text-emerald-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
