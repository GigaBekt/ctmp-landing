import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Envelope, Eye, EyeSlash, Lock } from "phosphor-react";
import { authApi } from "@/api";
import { AccountType } from "@/api/auth/interface";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await authApi.login(formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      if (response.data.user.accounts[0].type === AccountType.INDIVIDUAL) {
        navigate("/dashboard");
      } else {
        navigate("/vendor/dashboard");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      setErrorMessage("Invalid email or password");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back
              </h1>
            </motion.div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
          >
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
            <div className="space-y-5">
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
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#2c74b3] focus:ring-2 focus:ring-[#2c74b3] focus:ring-opacity-20 transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

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
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#2c74b3] focus:ring-2 focus:ring-[#2c74b3] focus:ring-opacity-20 transition-all duration-200"
                    placeholder="Enter your password"
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
                <div className="flex justify-end mt-2">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#2c74b3] hover:text-[#235d8f] transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full bg-[#2c74b3] text-white py-3 px-4 rounded-xl hover:bg-[#235d8f] transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
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
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>

              <div className="text-center">
                <p className="text-gray-600">
                  New to our platform?{" "}
                  <Link
                    to="/register"
                    className="text-[#2c74b3] hover:text-[#235d8f] font-medium transition-colors"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
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
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05]" />

        <div className="relative h-full flex items-center justify-center p-12">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold text-white mb-6">
              Manage your projects with ease
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-12">
              Access your dashboard to track projects, communicate with service
              providers, and more.
            </p>

            {/* Testimonials Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.svg
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
              <p className="text-lg italic text-white mb-4">
                "The platform has revolutionized how I manage my property
                services. Highly recommended!"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://randomuser.me/api/portraits/women/1.jpg"
                  alt="Testimonial"
                  className="w-12 h-12 rounded-full ring-4 ring-white/20"
                />
                <div>
                  <p className="font-semibold text-white">Sarah Johnson</p>
                  <p className="text-blue-200">Property Owner</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
