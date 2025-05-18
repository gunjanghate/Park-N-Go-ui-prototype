import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Userpage() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="">
            <header className="w-full flex justify-between items-center px-4 py-3 motion-preset-rebound-down  bg-custom-gradient rounded-b-2xl min-h-24">
        <div className="flex items-center ">
          <img src={logo} alt="Logo" className="w-12 h-14 md:w-16 md:h-10" />
          <span className="ml-2 text-2xl sm:text-2xl font-semibold text-white tracking-tighter">
            Park-N-Go
          </span>
        </div>
        <p className="text-xl text-white">Hey User!</p>
      </header>
      <main>
        
      </main>
    </div>
  )
}

export default Userpage
