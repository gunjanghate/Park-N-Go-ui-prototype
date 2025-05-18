import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  const handleGetDirections = async () => {
    try {
      // Replace with your own API or logic for fetching transit directions
      const response = await axios.get("https://api.open-maps.com/directions", {
        params: {
          origin,
          destination,
          mode: "transit",
        },
      });

      if (response.data.status === "OK") {
        setDirections(response.data.routes);
        setError(null);
      } else {
        setError("Could not fetch directions. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching directions.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Local Transport Finder</h1>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <label className="block text-gray-700">Origin:</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Enter starting location"
        />

        <label className="block text-gray-700">Destination:</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination"
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          onClick={handleGetDirections}
        >
          Get Directions
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      <div className="mt-6 w-full">
        {directions && (
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-bold mb-2">Directions:</h2>
            <ul className="list-disc ml-6">
              {directions.map((step, index) => (
                <li key={index} className="mb-2">
                  {step.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
