import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendUrl, getCSRFToken } from "../assets/scripts/utils";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
    organization: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const errors = {};

    // Username validation
    if (!formData.username.trim()) {
      errors.username = "Username is required.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    setFormErrors(errors);

    // Return true if no errors
    return Object.keys(errors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(formData)

    if (validateForm()) {
      // Proceed with registration logic
      axios.post(`${backendUrl()}/register`, formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
          },
          withCredentials: true  // Ensure cookies are sent with the request
        })
        .then((res) => {
          if (res.data) {
            alert(res.data.message);  // Accessing the response message
          } else {
            alert("Registration successful, but no message received.");
          }
            navigate("/admin/form");  
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            alert(err.response.data.message);  // Handling error message from the backend
          } else {
            alert("An error occurred. Please try again.");
          }
        });
    }
  }

  return (
    <div className="min-h-screen bg-custom-gradient flex flex-col">
      {/* Header */}
      <header className="w-full min-h-[8vh] rounded-b-2xl flex justify-between items-center px-4 py-3 motion-preset-slide-down-md motion-delay-200">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12 md:w-16 md:h-10" />
          <span className="ml-2 text-2xl sm:text-2xl font-semibold text-white tracking-tighter">
            Park-N-Go
          </span>
        </div>
        <div className="cursor-pointer" onClick={() => setMenuOpen((prev) => !prev)}>
          <svg
            fill="none"
            viewBox="0 0 50 50"
            height="28"
            width="28"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 md:w-12 md:h-12"
          >
            <path
              className="lineTop line"
              strokeLinecap="round"
              strokeWidth="4"
              stroke="white"
              d="M6 11L44 11"
            ></path>
            <path
              strokeLinecap="round"
              strokeWidth="4"
              stroke="white"
              d="M6 24H43"
              className="lineMid line"
            ></path>
            <path
              strokeLinecap="round"
              strokeWidth="4"
              stroke="white"
              d="M6 37H43"
              className="lineBottom line"
            ></path>
          </svg>
        </div>
        {menuOpen && (
          <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg w-32 sm:w-40">
            <ul className="text-gray-800">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate('/admin/login')}
              >
                Admin Controls
              </li>
            </ul>
          </div>
        )}
      </header>

      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="w-11/12 max-w-sm bg-white p-6 rounded-lg shadow-lg motion-preset-expand">
          <h1 className="text-xl font-semibold text-center text-gray-700">Register</h1>
          <form className="mt-6" onSubmit={handleRegister}>

            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full mt-1 px-4 py-2 border ${formErrors.username ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring focus:ring-[#68BBE3] focus:outline-none`}
                placeholder="Username"
              />
              {formErrors.username && (
                <p className="text-sm text-red-500 mt-1">{formErrors.username}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="contact"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className={`w-full mt-1 px-4 py-2 border ${formErrors.contact ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring focus:ring-[#68BBE3] focus:outline-none`}
                placeholder="Contact"
              />
              {formErrors.contact && (
                <p className="text-sm text-red-500 mt-1">{formErrors.contact}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full mt-1 px-4 py-2 border ${formErrors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring focus:ring-[#68BBE3] focus:outline-none`}
                placeholder="Email"
              />
              {formErrors.email && (
                <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                Organization
              </label>
              <input
                type="organization"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                className={`w-full mt-1 px-4 py-2 border ${formErrors.organization ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring focus:ring-[#68BBE3] focus:outline-none`}
                placeholder="Organization"
              />
              {formErrors.organization && (
                <p className="text-sm text-red-500 mt-1">{formErrors.organization}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full mt-1 px-4 py-2 border ${formErrors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring focus:ring-[#68BBE3] focus:outline-none`}
                placeholder="Password"
              />
              {formErrors.password && (
                <p className="text-sm text-red-500 mt-1">{formErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-custom-gradient text-white font-semibold rounded-md shadow-md hover:bg-[#68BBE3] hover:shadow-lg transition"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/admin/login" className="text-[#003060] hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </main>

      <footer className="w-full rounded-t-2xl text-center py-2 text-white text-xs sm:text-sm">
        © 2024 ParkSmart ~ All rights reserved
      </footer>
    </div>
  );
};

export default RegisterPage;
