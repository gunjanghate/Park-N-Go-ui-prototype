import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import car from "../assets/CarTest.gif";
import logo from "../assets/logo.png";
import arr from "../assets/getStartedArr.gif";
import test from "../assets/test.svg";
import { Link } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="lan-main min-h-screen flex flex-col bg-[#fff] font-body">

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

      <main className="flex flex-col items-center justify-evenly flex-grow gap-3 text-center">
        <div className="motion-preset-slide-right motion-opacity-in-[50%] motion-blur-in-[2px] motion-duration-[1.13s]/opacity motion-delay-[0.75s]/blur">
          <img src={test} alt="Illustration" className="w-[80vw] h-auto " />
        </div>

        <img
          src={car}
          alt="Car animation"
          className="motion-opacity-in-[50%] motion-duration-[1.13s]/opacity motion-delay-[0.75s]/blur rounded-full w-[65vw] sm:w-[40vw] motion-preset-shake"
        />
        <p className="mx-4 text-white mt-4 motion-preset-slide-right motion-delay-1000 text-lg md:text-xl font-bold">
          Discover nearby parkings, save time, and park smartly.
        </p>
        <div className="get started flex justify-center items-center gap-5 py-2">
          <button
            onClick={() => {
              setTimeout(() => {
                navigate("/asa");
              }, 500);
            }}
            className="text-xl font-semibold px-10 py-3 border border-blue-950  rounded-full relative text-white transition-all overflow-hidden bg-black/70 shadow-sm shadow-white hover:text-black group">
            <a
              href="#getstarted"
              className="relative z-10 text-inherit no-underline transition-colors"
            >
              Get Started
            </a>
            <span className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 rounded-full transition-all"></span>
          </button>
        </div>

      </main>

      <footer className="w-full rounded-t-2xl text-center py-2  text-white text-xs sm:text-sm motion-preset-rebound-up">
        © 2024 Park-N-Go ~ All rights reserved
      </footer>
    </div>
  );
};

export default LandingPage;
