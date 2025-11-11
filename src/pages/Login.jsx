import React, { use, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import login from "../assets/login.png";
import logo from "/logo.png";
import { Link, useLocation, useNavigate } from "react-router";

import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { signInUser, signInWithGoogle } = use(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    toast.loading("Loading...", { id: "login-user" });
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        e.target.reset();
        toast.success("Logged in successfully!", { id: "login-user" });
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
        let message = "";
        if (error.code === "auth/invalid-email") {
          message = "Invalid email address.";
        } else if (error.code === "auth/user-disabled") {
          message = "This account has been disabled.";
        } else if (error.code === "auth/user-not-found") {
          message = "No account found with this email.";
        } else if (error.code === "auth/wrong-password") {
          message = "Incorrect password.";
        } else if (error.code === "auth/too-many-requests") {
          message = "Too many login attempts. Try again later.";
        } else {
          message = error.message;
        }

        toast.error(message, { id: "login-user" });
      });
  };

  const handleGoogleSignIn = () => {
    toast.loading("Loading...", { id: "login-user" });
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        toast.success("Logged in successfully!", { id: "login-user" });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
        let message = "";

        if (error.code === "auth/popup-closed-by-user") {
          message = "Sign-in popup was closed before completing.";
        } else if (error.code === "auth/cancelled-popup-request") {
          message = "Sign-in was cancelled due to another active popup.";
        } else if (
          error.code === "auth/account-exists-with-different-credential"
        ) {
          message = "An account already exists with a different provider.";
        } else if (error.code === "auth/network-request-failed") {
          message = "Network error. Please check your connection.";
        } else {
          message = error.message;
        }

        toast.error(message, { id: "login-user" });
      });
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      <motion.div
        className="hidden lg:flex bg-linear-to-br from-primary via-[#053234] to-primary items-center justify-center p-12 relative overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute top-16 left-16 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-16 right-16 w-56 h-56 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [360, 180, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-secondary/40 rounded-full"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
              y: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}

        <motion.img
          src={login}
          className="w-3/4 max-w-lg relative z-10 drop-shadow-2xl"
          alt="Login illustration"
        />

        <motion.div
          className="absolute bottom-12 left-12 text-white z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-2 logo-font">
            <span className="text-secondary">Task</span>Verse
          </h2>
          <p className="text-white/80 ">Your freelance journey starts here</p>
        </motion.div>
      </motion.div>

      <div className="flex items-center justify-center bg-base-300 p-6">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-base-200/80  rounded-2xl shadow-2xl p-8 border border-secondary/50">
            <div className="text-center mb-8">
              <motion.div
                className="inline-block"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.5,
                }}
              >
                <Link
                  to={"/"}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 "
                >
                  <img src={logo} alt="" />
                </Link>
              </motion.div>
              <h2 className="text-3xl font-bold text-primary-content mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-500">Sign in to continue to TaskVerse</p>
            </div>

            <form onSubmit={handleLogIn} className="space-y-5">
              {/* Email  */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Email
                  </span>
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
                    size={20}
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="input input-bordered w-full pl-12 focus:border-secondary focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password  */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
                    size={20}
                  />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="input input-bordered w-full pl-12 pr-12 focus:border-secondary focus:outline-none transition-colors "
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary/80 transition-colors z-10 cursor-pointer "
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="label cursor-pointer gap-2 p-0">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span className="label-text text-sm">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-sm text-secondary hover:text-secondary/80 transition-colors font-medium"
                >
                  Forgot Password?
                </a>
              </div>

              <motion.button
                type="submit"
                className="btn bg-secondary text-primary hover:bg-secondary/90 w-full font-bold border-none shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Login
              </motion.button>

              <div className="divider text-gray-400 text-sm my-6">OR</div>

              <motion.button
                onClick={handleGoogleSignIn}
                type="button"
                className="btn btn-outline w-full text-primary-content hover:text-primary border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </motion.button>

              <p className="text-sm text-center text-gray-500 mt-6">
                Don't have an account?{" "}
                <a
                  href="/auth/register"
                  className="text-secondary font-semibold hover:text-secondary/80 transition-colors"
                >
                  Register now
                </a>
              </p>
            </form>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            By continuing, you agree to our{" "}
            <a
              href="#"
              className="text-secondary hover:text-secondary/80 transition-colors"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-secondary hover:text-secondary/80 transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
