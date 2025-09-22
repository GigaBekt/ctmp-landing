import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Envelope,
  Eye,
  EyeSlash,
  Lock,
  User,
  Buildings,
  UserCircle,
  CaretRight,
  Phone,
} from "phosphor-react";

interface FormData {
  userType: "customer" | "vendor";
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const rightSideContent = {
  customer: {
    title: "Find the right HVAC contractor",
    description:
      "Get competitive bids from certified HVAC professionals in your area",
    stats: [
      { number: "2,000+", label: "Completed Installations" },
      { number: "500+", label: "Verified Contractors" },
      { number: "40%", label: "Avg. Cost Savings" },
    ],
    features: [
      "Verified HVAC Contractors",
      "Competitive Bidding",
      "Digital Project Management",
    ],
  },
  vendor: {
    title: "Grow your HVAC business",
    description:
      "Connect with homeowners looking for HVAC installation and replacement services",
    stats: [
      { number: "$50K+", label: "Avg. Monthly Revenue" },
      { number: "30+", label: "Leads per Month" },
      { number: "85%", label: "Bid Success Rate" },
    ],
    features: [
      "Qualified Leads",
      "Service Area Targeting",
      "Digital Documentation",
    ],
  },
};

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    userType: "customer",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }));
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleUserTypeChange = (userType: "customer" | "vendor") => {
    setFormData((prev) => ({ ...prev, userType }));
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleCancelRegistration = () => {
    setIsLoading(false);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    // Mock loading for visual purposes
    setTimeout(() => {
      setIsLoading(false);
      // Mock navigation based on user type

      navigate("/dashboard");
      console.log("Register form submitted (visual only):", formData);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-xl space-y-8">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
          >
            {/* Error Message Display */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-center"
                role="alert"
              >
                {errorMessage}
              </motion.div>
            )}
            {/* User Type Selection */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => handleUserTypeChange("customer")}
                  className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                    formData.userType === "customer"
                      ? "border-[#2c74b3] bg-blue-50 text-[#2c74b3]"
                      : "border-gray-200 hover:border-[#2c74b3] text-gray-600"
                  }`}
                >
                  <UserCircle className="w-6 h-6" />
                  <span className="font-medium">Customer</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => handleUserTypeChange("vendor")}
                  className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                    formData.userType === "vendor"
                      ? "border-[#2c74b3] bg-blue-50 text-[#2c74b3]"
                      : "border-gray-200 hover:border-[#2c74b3] text-gray-600"
                  }`}
                >
                  <Buildings className="w-6 h-6" />
                  <span className="font-medium">Service Provider</span>
                </motion.button>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#2c74b3] transition-colors w-5 h-5" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#2c74b3] focus:ring-2 focus:ring-[#2c74b3] focus:ring-opacity-20 transition-all duration-200"
                    placeholder="John"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#2c74b3] transition-colors w-5 h-5" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#2c74b3] focus:ring-2 focus:ring-[#2c74b3] focus:ring-opacity-20 transition-all duration-200"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative group">
                <Envelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#2c74b3] transition-colors w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#2c74b3] focus:ring-2 focus:ring-[#2c74b3] focus:ring-opacity-20 transition-all duration-200"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative group">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#2c74b3] transition-colors w-5 h-5" />
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#2c74b3] focus:ring-2 focus:ring-[#2c74b3] focus:ring-opacity-20 transition-all duration-200"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#2c74b3] transition-colors w-5 h-5" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#2c74b3] focus:ring-2 focus:ring-[#2c74b3] focus:ring-opacity-20 transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlash className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#2c74b3] transition-colors w-5 h-5" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#2c74b3] focus:ring-2 focus:ring-[#2c74b3] focus:ring-opacity-20 transition-all duration-200"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeSlash className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isLoading}
                className="relative w-full bg-[#2c74b3] text-white py-3 px-4 rounded-xl hover:bg-[#235d8f] transition-colors duration-200 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <>
                    Create Account
                    <CaretRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                  </>
                )}
              </motion.button>

              {/* Cancel button - only show when loading */}
              {isLoading && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  type="button"
                  onClick={handleCancelRegistration}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-xl hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancel Registration
                </motion.button>
              )}

              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#2c74b3] hover:text-[#235d8f] font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <p className="text-xs text-center text-gray-500">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="text-[#2c74b3] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-[#2c74b3] hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </motion.form>
        </div>
      </motion.div>

      {/* Right side - Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-[#2c74b3] to-[#144272] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-white/[0.05]" />

        <div className="relative h-full flex items-center justify-center p-12">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold text-white mb-6">
              {rightSideContent[formData.userType].title}
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-12">
              {rightSideContent[formData.userType].description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              {rightSideContent[formData.userType].stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={`https://randomuser.me/api/portraits/men/${i}.jpg`}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <p className="text-sm text-blue-100">
                  Join thousands of satisfied users
                </p>
              </div>
              <div className="flex gap-2">
                {rightSideContent[formData.userType].features.map(
                  (feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-white/20 text-white px-3 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
