import React from 'react';
import { useNavigate } from 'react-router-dom';
import car from "../assets/marker-user-removebg.png";
import truck from "../assets/boxtruck.png";
import logo from "../assets/logo.png";

export default function AsaWhat() {
  const router = useNavigate();

  const handleChoice = (choice) => {
    if (choice === 'city') {
      router('/maps');
    } else if (choice === 'logistics') {
      router('/logistics');
    }
  };

  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="lan-main min-h-screen flex flex-col bg-[#fff] font-body">
      {/* Header */}
      <header className="w-full min-h-[8vh] rounded-b-2xl flex justify-between items-center px-4 py-3 motion-preset-slide-down-md motion-delay-300">
              <div className="flex justify-center items-center">
                <img src={logo} alt="Logo" className="w-12 h-12 md:w-16 md:h-16" />
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

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center min-h-screen bg-custom-gradient">
        <div className="main w-80 flex flex-col justify-center items-center h-3/4 bg-white backdrop-blur-2xl border-4 p-5 mx-auto drop-shadow-2xl rounded-lg border-white shadow-sm shadow-white motion-preset-shrink">
          <h1 className="mb-6 text-3xl font-bold text-black">
            How do you want to access the parking?
          </h1>
          <div className="flex space-x-4 flex-col justify-center items-center gap-4">
            <button
              onClick={() => handleChoice('city')}
              className="px-6 py-3 bg-gray-300 text-black text-xl font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 motion-preset-fade-lg"
            >
              <img src={car} alt="City User" className="m-2 w-32 h-32" />
              As a City User
            </button>
            <button
              onClick={() => handleChoice('logistics')}
              className="px-6 py-3 bg-gray-300 text-black text-xl font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 motion-preset-fade-lg"
            >
              <img src={truck} alt="Logistics User" className="m-2 w-32 h-32" />
              As a Logistics User
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full rounded-t-2xl text-center py-2 text-white text-xs sm:text-sm motion-preset-rebound-up">
        © 2024 Park-N-Go ~ All rights reserved
      </footer>
    </div>
  );
}
