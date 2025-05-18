import React, { useState } from 'react';
import { QRCodeCanvas } from "qrcode.react";

function TicketGenerator() {
  const [userName, setUserName] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [ticket, setTicket] = useState(null);

  const generateRandomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit random number
  };

  const handleGenerateTicket = () => {
    if (!userName || !timeSlot) {
      alert('Please enter your name and select a time slot.');
      return;
    }

    const currentDate = new Date().toLocaleString();
    const randomNumber = generateRandomNumber();

    setTicket({
      name: userName,
      date: currentDate,
      slot: timeSlot,
      qrCode: randomNumber,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-gradient p-6">
      <h1 className="text-2xl tracking-tight font-bold text-white mb-4">Generate Your Parking Ticket</h1>

      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="mb-4 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="mb-4 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a time slot</option>
          <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
          <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
          <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
          <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
          <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
          <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
          <option value="6:00 PM - 7:00 PM">7:00 PM - 8:00 PM</option>
          <option value="7:00 PM - 8:00 PM">8:00 PM - 9:00 PM</option>
        </select>

        <button
          onClick={handleGenerateTicket}
          className="mb-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Generate Ticket
        </button>

        {ticket && (
          <div className="mt-6 bg-gray-50 shadow-md p-4 rounded-lg text-center flex flex-col justify-center items-center">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Parking Ticket</h2>
            <p className="text-gray-700">Name: {ticket.name}</p>
            <p className="text-gray-700">Date: {ticket.date}</p>
            <p className="text-gray-700">Time Slot: {ticket.slot}</p>
            <div className="mt-4">
            <QRCodeCanvas value={String(ticket.qrCode)} size={150} />
            </div>
            <p className="mt-2 text-gray-600">Ticket ID: {ticket.qrCode}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketGenerator;
