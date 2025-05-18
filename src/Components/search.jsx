import React from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full p-4 bg-blue-400 shadow-md">
      {/* Back Button */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/home")}
          className="transition-all bg-transparent hover:opacity-75"
        >
          <svg
            width="47"
            height="47"
            viewBox="0 0 47 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="23.5" cy="23.5" r="23.5" fill="white" />
            <path
              d="M17.7813 24.5L24.7813 32.9L23 35L13 23L23 11L24.7813 13.1L17.7813 21.5H33V24.5H17.7813Z"
              fill="#1D1B20"
            />
          </svg>
        </button>
      </div>

      {/* Location Section */}
      <div className="flex flex-col items-start mt-2 pl-4">
        {/* "Location" Label */}
        <h3 className="text-white text-xs uppercase mb-1">Location</h3>

        {/* Location Name and Arrow */}
        <div className="flex items-center gap-2">
          {/* Location Icon */}
          <svg
            width="33"
            height="34"
            viewBox="0 0 33 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.5 31.1667C16.1792 31.1667 15.9042 31.0723 15.675 30.8834C15.4458 30.6945 15.274 30.4466 15.1594 30.1396C14.724 28.8174 14.174 27.5778 13.5094 26.4209C12.8677 25.2639 11.9625 23.9063 10.7938 22.348C9.625 20.7896 8.67396 19.3021 7.94062 17.8855C7.23021 16.4688 6.875 14.757 6.875 12.75C6.875 9.98754 7.80312 7.65004 9.65937 5.73754C11.5385 3.80143 13.8188 2.83337 16.5 2.83337C19.1813 2.83337 21.45 3.80143 23.3062 5.73754C25.1854 7.65004 26.125 9.98754 26.125 12.75C26.125 14.8987 25.724 16.6931 24.9219 18.1334C24.1427 19.55 23.2375 20.9549 22.2063 22.348C20.9688 24.048 20.0292 25.4646 19.3875 26.598C18.7688 27.7077 18.2531 28.8882 17.8406 30.1396C17.726 30.4702 17.5427 30.7299 17.2906 30.9188C17.0615 31.0841 16.7979 31.1667 16.5 31.1667ZM16.5 16.2917C17.4625 16.2917 18.276 15.9493 18.9406 15.2646C19.6052 14.5799 19.9375 13.7417 19.9375 12.75C19.9375 11.7584 19.6052 10.9202 18.9406 10.2355C18.276 9.55073 17.4625 9.20837 16.5 9.20837C15.5375 9.20837 14.724 9.55073 14.0594 10.2355C13.3948 10.9202 13.0625 11.7584 13.0625 12.75C13.0625 13.7417 13.3948 14.5799 14.0594 15.2646C14.724 15.9493 15.5375 16.2917 16.5 16.2917Z"
              fill="#FEF7FF"
            />
          </svg>

          {/* Location Text and Downward Arrow */}
          <span className="text-white text-sm flex items-center gap-1">
            Gittikhadan, Nagpur
            {/* Downward Arrow Icon using Provided SVG */}
            <svg
              width="18"
              height="28"
              viewBox="0 0 18 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width="18" height="28" fill="url(#pattern0_71_62)" />
              <defs>
                <pattern
                  id="pattern0_71_62"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_71_62"
                    transform="matrix(0.0111111 0 0 0.00714286 0 0.178571)"
                  />
                </pattern>
                <image
                  id="image0_71_62"
                  width="90"
                  height="90"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACNklEQVR4nO3avU5UQRiH8SECggWJrRo6GrgBbazprKURvQFvgYKCQJCaThJMrKXaSyAUdFLQUUDEDxIKQgE+5CRTEV3Ox3vOvjPn/0tomXdOdnfmgQ1BRERERERERERERERERERERERE+gSYBD4BF/FnC5gOPQNMx73/ic+heCaTlgsUv/C+A+BF6AngedzzfZuWi/zi386AVyFzwEvg9D/P4KflQsNcAx9CpoC3wNWwB2C5WBnbwETIBPAIWCuzcctFyxoAT0PigBngW9lNWy5cxTGwEBIFzAHfq2zYcvGqLoE3ITHAYry2VWI5QB1/gRVgLCQA+Ajc1Nmo5RAn1PfFc9zECClmrOu35TCrNHPgMW6GREgVq5YDjQO7DQc69RQ3D0RIWcUzGXf1OeYpboClhyJk5OdP3ZPZQ9xUiRAXN6p41zxqOPCgy7iJEbLXcOaiEea7mtl68AWPEeKqelN4K2L3UWd/6OVyuGBzeL8Pnhhdl74CTwxmeQx8bjjLOfA6eAQ8A/YbbvAQmE15hk4AU8DOKF5NOHpXdabruMHpOdGJLuKGBG4+yccNqUZISnFDgnXaCQzf4llFSFuA5XjQ1XUbf+oq1n4X+gCba1heEdIWbMIirwhxHjf5RYjjuMkvQtqCzU0irwhpCzZ347wixHHcDLKLEIdxs511hLSF8n+R8/efkAzj5rx3ETKCuDnsbYS0/GXEjfgK/gGse/7ypIiIiIiIiIiIiIiIiIiIiIiEJNwBxR19cZIUClMAAAAASUVORK5CYII="
                />
              </defs>
            </svg>
          </span>

        </div>
      </div>

      {/* Search Box */}
      <div className="flex items-center w-full mt-4 bg-white rounded-full shadow-sm">
        {/* Menu Icon */}
        <button className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Input */}
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 text-sm text-gray-700 bg-transparent focus:outline-none"
        />

        {/* Search Icon */}
        <button className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 4a7 7 0 110 14a7 7 0 010-14zm7 14l-3.5-3.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Search;
