import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCSRFToken, backendUrl } from '../assets/scripts/utils';
import logo from '../assets/logo.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [parkingDetails, setparkingDetails] = useState({
    id: '',
    name: '',
    owner: '',
    address: '',
    contact: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    axios.get(`${backendUrl()}/getParking?mode=id`, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken(),
      }, withCredentials: true
    }).then((response) => {
      setparkingDetails({
        id: response.data.id,
        name: response.data.name,
        owner: response.data.owner_name,
        address: response.data.address,
        contact: response.data.contact,
        city: response.data.city,
        state: response.data.state,
        pincode: response.data.pincode,
      });
    }).catch((error) => {
      console.log(error.response);
    });
  }, []);

  const logout = () => {
    axios
      .post(
        `${backendUrl()}/logout`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        alert('log out done');
        console.log(response.data);
        navigate('/admin/login');
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const [filledSpots] = useState(28);
  const totalCapacity = 54;
  const filledPercentage = (filledSpots / totalCapacity) * 100;

  const [bookings, setBookings] = useState({
    newRequests: [
      { id: 1, time: 'Till 4PM', duration: '3 hours' },
      { id: 2, time: 'Till 6PM', duration: '5 hours' },
    ],
    current: [
      { id: 3, name: 'Mr. Mahesh Bora', time: 'Till 3PM', price: 150 },
      { id: 4, name: 'Mr. Mahesh Bora', time: 'Till 5PM', price: 250 },
    ],
    completed: [
      { id: 5, name: 'Mr. Mahesh Bora', time: '11AM', price: 250 },
    ],
  });

  return (
        <div className='bg-custom-gradient min-h-screen relative flex flex-col'>
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
          <h1 className="text-center text-3xl font-bold text-white my-6 ">Dashboard</h1>
          <div className="px-6 w-full mx-auto grid grid-cols-1 h-full md:grid-cols-2 gap-6">
            {/* First Column */}
            <div className="space-y-6">
              {/* Current Status */}
              <div className="bg-white bg-opacity-60 rounded-lg shadow-lg motion-preset-slide-right motion-duration-700">
                <div className="text-center text-lg font-semibold text-white bg-purple-800 rounded-t-lg py-2">Current status</div>
                <div className="relative w-11/12 mx-auto h-6 bg-gray-200 rounded-full mt-3">
                  <div
                    className="absolute top-0 left-0 h-full bg-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${filledPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-700 mt-2 px-4 pb-2">
                  <span>{filledSpots} Filled spots</span>
                  <span>{totalCapacity} Total capacity</span>
                </div>
              </div>

              {/* Parking Details */}
              <div className="bg-white bg-opacity-60 rounded-lg shadow-lg motion-preset-slide-right motion-duration-700">
                <div className="text-center text-lg font-semibold text-white bg-purple-800 rounded-t-lg py-2">Parking Details</div>
                <div className="px-4 py-4 space-y-4">
                  <div>
                    <p className="text-gray-800"><b>Parking ID:</b> {parkingDetails.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-800"><b>Name of the parking:</b> {parkingDetails.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-800"><b>Owner:</b> {parkingDetails.owner}</p>
                  </div>
                  <div>
                    <p className="text-gray-800"><b>Address:</b> {parkingDetails.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-800"><b>Contact:</b> {parkingDetails.contact}</p>
                  </div>
                  <div>
                    <p className="text-gray-800"><b>City:</b> {parkingDetails.city}</p>
                  </div>
                  <div>
                    <p className="text-gray-800"><b>State:</b> {parkingDetails.state}</p>
                  </div>
                  <div>
                    <p className="text-gray-800"><b>Pin code:</b> {parkingDetails.pincode}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Column */}
            <div className="bg-white bg-opacity-60 rounded-lg shadow-lg motion-preset-slide-left motion-duration-700">
              <div className="text-center text-lg font-semibold text-white bg-purple-800 rounded-t-lg py-2">Bookings</div>
              <div className="px-4 py-4 space-y-4">
                {/* New Requests */}
                <div>
                  <p className="font-bold text-gray-800">New Booking Requests:</p>
                  {bookings.newRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex justify-between items-center p-3 bg-purple-100 rounded-md mt-2 shadow-md"
                    >
                      <span>{request.time} ({request.duration})</span>
                      <div>
                        <button className="bg-green-500 text-white px-2 py-1 rounded-md mr-2">Approve</button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded-md">Cancel</button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Current Bookings */}
                <div>
                  <p className="font-bold text-gray-800">Current Bookings:</p>
                  {bookings.current.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex justify-between items-center p-3 bg-blue-100 rounded-md mt-2 shadow-md"
                    >
                      <span>{booking.name} - {booking.time}</span>
                      <span>&#8377; {booking.price}</span>
                    </div>
                  ))}
                </div>

                {/* Completed Bookings */}
                <div>
                  <p className="font-bold text-gray-800">Completed Bookings:</p>
                  {bookings.completed.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex justify-between items-center p-3 bg-gray-300 rounded-md mt-2 shadow-md"
                    >
                      <span>{booking.name} - {booking.time}</span>
                      <span>&#8377; {booking.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <footer className="w-full rounded-t-2xl text-center py-2  text-white text-xs sm:text-sm motion-preset-rebound-up">
        © 2024 Park-N-Go ~ All rights reserved
      </footer>
        </div>
      );
    };
    
    export default Dashboard;
