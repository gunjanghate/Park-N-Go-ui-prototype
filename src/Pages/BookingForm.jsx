import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';
import { backendUrl, getCSRFToken } from '../assets/scripts/utils';

function TicketGenerator() {
  const location = useLocation();
  const navigate = useNavigate();

  const { id, carPrice, bikePrice, parkingName } = location.state || {};
  const [isClicked, setIsClicked] = useState(false);
  const [userName, setUserName] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [ticket, setTicket] = useState(null);
  const [payComp, setPayComp] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(carPrice);
  const [vehicleType, setVehicleType] = useState('car');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const generateRandomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit random number
  };

  const handleClick = () => {
    console.log(id)
    console.log('Button clicked!');

    axios.post(`${backendUrl()}/requestBooking`, {
      parking_id: id,
      vehicle_type: vehicleType,
      vehicle_num: vehicleNo,
      slot_timing: timeSlot,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken(),
      },
      withCredentials: true,
    }).then((response) => {
      alert(response.data.message)
    }).catch((error) => {
      alert(error.response.data)
    });

    setIsClicked(true); 
  };

  // Update the price whenever the time slot or vehicle type changes
  useEffect(() => {
    console.log(id)
    if (vehicleType === 'car') {
      setSelectedPrice(carPrice);
    } else if (vehicleType === 'bike') {
      setSelectedPrice(bikePrice);
    }
  }, [vehicleType, carPrice, bikePrice]);

  // Function to generate time slots within the next 24 hours
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();

    // Loop to generate time slots for the next 24 hours (every hour)
    for (let i = 0; i < 24; i++) {
      const time = new Date(now);
      time.setHours(now.getHours() + i);

      const hours = time.getHours();
      const minutes = time.getMinutes().toString().padStart(2, '0');
      const period = hours < 12 ? 'AM' : 'PM';
      const formattedTime = `${hours % 12 || 12}:${minutes} ${period}`;

      slots.push(formattedTime);
    }

    setAvailableTimeSlots(slots);
  };

  useEffect(() => {
    generateTimeSlots(); // Generate time slots on component mount
  }, []);

  const handleGenerateTicket = () => {
    if (!userName || !timeSlot || !vehicleNo) {
      alert('Please fill all the fields: Name, Time Slot, and Vehicle Number.');
      return;
    }

    const currentDate = new Date().toLocaleString();
    const randomNumber = generateRandomNumber();

    const generatedTicket = {
      id: id,
      name: userName,
      date: currentDate,
      slot: timeSlot,
      vehicleNo: vehicleNo,
      price: selectedPrice, // Include price in the ticket data
      qrCode: randomNumber,
    };

    setTicket(generatedTicket);
  };

  const handleMakePayment = () => {
    setPayComp(true);
    setTicket(null);
    navigate('/pay', { state: { carPrice: selectedPrice } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-gradient p-6">
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-full max-w-md motion-preset-slide-right">
        <h1 className="text-2xl tracking-tight font-bold text-black mb-4">Generate Your Parking Ticket</h1>

        {/* Vehicle Type Select Dropdown */}
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="mb-4 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="car">Car</option>
          <option value="bike">Bike</option>
        </select>

        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="mb-4 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter your vehicle number"
          value={vehicleNo}
          onChange={(e) => setVehicleNo(e.target.value)}
          className="mb-4 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Time Slot Select Dropdown */}
        <input
          type="time"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="mb-4 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="08:00"  // Minimum time (e.g., parking available from 8 AM)
          max="20:00"  // Maximum time (e.g., parking available until 8 PM)
        />


        {/* Display the price automatically when a slot is selected */}
        <div className="mb-4 w-full px-4 py-2 border rounded-lg bg-gray-100">
          <p className="text-gray-700">{vehicleType === 'car' ? 'Car Slot Price' : 'Bike Slot Price'}: Rs {selectedPrice}</p>
        </div>

        {/* Generate Ticket Button */}
        <button
          onClick={() => {
            handleClick();
            handleGenerateTicket();
          }}
          disabled={isClicked}
          className={`mb-4 w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${isClicked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
        >
          Generate Ticket
        </button>

        {ticket && !payComp && (
          <div className="mt-6 bg-gray-50 shadow-md p-4 rounded-lg text-center flex flex-col justify-center items-center motion-preset-slide-up">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Parking Ticket of {parkingName}</h2>
            <h2 className="text-lg font-bold text-gray-800 mb-2"> {ticket.id}</h2>
            <p className="text-gray-700">Name: {ticket.name}</p>
            <p className="text-gray-700">Vehicle No: {ticket.vehicleNo}</p>
            <p className="text-gray-700">Date: {ticket.date}</p>
            <p className="text-gray-700">Up to: {ticket.slot}</p>
            <p className="text-gray-700">Price: Rs {ticket.price}</p>
            <div className="mt-4">
              <QRCodeCanvas value={String(ticket.qrCode)} size={150} />
            </div>
            <p className="mt-2 text-gray-600">Ticket ID: {ticket.qrCode}</p>
            <button
              onClick={handleMakePayment}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Make Payment
            </button>
            <h1>Take a SnapShot!</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketGenerator;
