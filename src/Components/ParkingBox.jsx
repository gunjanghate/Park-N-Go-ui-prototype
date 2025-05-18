import React, { useState, useEffect } from "react";


import P from "../assets/P.png";
import Car from "../assets/car.png";
import clock from "../assets/clock.png";
import priceicon from "../assets/price.png";
import bike from "../assets/bike.png";
import addressicon from "../assets/address.png";
import line from "../assets/distance.png"
import { useNavigate, useLocation } from "react-router-dom";
const ParkingBox = ({
  id,
  name,
  carprice,
  bikeprice,
  distance,
  carspots,
  bikespots,
  time,
  address,
  image,

}) => {
  const [carspotsLeft, setCarSpotsLeft] = useState(carspots);
  const [bikespotsLeft, setBikeSpotsLeft] = useState(bikespots);
  const [isTracking, setIsTracking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(id, "in parkingbox")
    if (isTracking) {

      const interval = setInterval(() => {
        checkSpotsAndNotify();
      }, 10000); // Check every 10 seconds

      return () => clearInterval(interval);
    }
  }, [isTracking]);

  const checkSpotsAndNotify = () => {
    // Simulate updates to spots left
    const updatedCarSpots = Math.max(0, carspotsLeft - Math.floor(Math.random() * 3));
    const updatedBikeSpots = Math.max(0, bikespotsLeft - Math.floor(Math.random() * 3));
    setCarSpotsLeft(updatedCarSpots);
    setBikeSpotsLeft(updatedBikeSpots);

    // Notify user if tracking is active
    if (updatedCarSpots !== carspotsLeft || updatedBikeSpots !== bikespotsLeft) {
      showNotification(
        `${name}: ${updatedCarSpots} car spots and ${updatedBikeSpots} bike spots left!`
      );
    }
  };

  const showNotification = (message) => {
    if (Notification.permission === "granted") {
      new Notification(message);
    } else {
      console.warn("Notifications are not permitted.");
    }
  };

  const startTracking = () => {
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setIsTracking(true);
          setShowModal(false);
        }
      });
    } else if (Notification.permission === "granted") {
      setIsTracking(true);
      setShowModal(false);
    } else {
      alert("Please enable notifications in your browser settings.");
    }
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  return (
    <div className="flex mx-2 mt-4 relative"
      key={id}>
      {isTracking && (
        <div className="absolute top-0 right-0 z-[1000] text-white px-2 py-1 rounded-lg bg-red-500">
          <button onClick={stopTracking}>Stop notifications</button>
        </div>
      )}

      <div
        className="flex flex-col w-full min-h-[54vh] sm:w-[300px] border border-gray-300 rounded-3xl overflow-hidden bg-transparent drop-shadow-xl backdrop-blur-2xl shadow-md transform transition-transform duration-50 hover:scale-100 active:scale-110 hover:bg-gray-100"
        onClick={() => {
          if (isTracking) {
            setShowTrackingModal(true); // Show modal if already tracked
          } else {
            setShowModal(true); // Show confirmation modal if not tracked
          }
        }}
      >
        <img
          src={image ? image : P}
          alt="Parking"
          className="w-full h-[220px] object-cover p-3 rounded-3xl"
        />
        <div className="pt-1 px-4 pb-4">
          <div className="flex flex-row mx-2 sm:flex-row justify-between items-start sm:items-center">
            <div className="c11 flex flex-col gap-3">
              <div className="c1 flex items-center text-sm font-bold text-gray-600 mb-2 sm:mb-0 gap-2">
                <div className="icon1">
                  <img src={P} alt="P" className="w-7" />
                </div>


                <p>{name}</p>
              </div>
              <div className="c3 flex items-center text-sm font-bold text-gray-600 mb-2 sm:mb-0 gap-2">
                <div className="icon3">
                  <img src={addressicon} alt="" className="w-7" />
                </div>
                <p>{address}</p>
              </div>
            </div>

            <div className="c22 flex flex-col gap-3">
              <div className="c2 flex items-center text-sm font-bold text-gray-600 mb-2 sm:mb-0 gap-2">
                <div className="icon2">
                  <img src={clock} alt="" className="w-7" />
                </div>
                <p>{time}</p>
              </div>
              <div className="c2 flex items-center text-sm font-bold text-gray-600 mb-2 sm:mb-0 gap-2">
                <div className="icon2">
                  <img src={line} alt="" className="w-7" />
                </div>
                <p>{distance} km</p>

              </div>
            </div>
          </div>
          <div className="c33 flex flex-row gap-28 mt-4 mx-2">
            <div className="r1 flex flex-col">
              <div className="c5 flex items-center text-sm font-bold text-gray-600 gap-2">
                <div className="icon5">
                  <img src={Car} alt="" className="w-7" />
                </div>
                <p>{carspotsLeft} spots</p>
              </div>
              <div className="c4 flex items-center text-sm font-bold text-gray-600 mb-2 sm:mb-0 gap-2 mt-4">
                <div className="icon4">
                  <img src={priceicon} alt="" className="w-7" />
                </div>
                <p>Rs {carprice}</p>
              </div>
            </div>

            <div className="r2 flex flex-col ">
              <div className="c6 flex items-center text-sm font-bold text-gray-600 gap-2">
                <div className="icon6">
                  <img src={bike} alt="" className="w-7" />
                </div>
                <p>{bikespotsLeft} spots</p>
              </div>
              <div className="c4 flex items-center text-sm font-bold text-gray-600 mb-2 sm:mb-0 gap-2 mt-4">
                <div className="icon4">
                  <img src={priceicon} alt="" className="w-7" />
                </div>
                <p>Rs {bikeprice}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 right-0 z-[1000] text-white px-2 py-1 rounded-lg bg-custom-gradient">
        <button
          onClick={() => {
            console.log(id)
            navigate("/book-form", {
              state: {
                id: id,
                carPrice: carprice,
                bikePrice: bikeprice,
                parkingName: name, // Optionally include parking name or other details
              },
            });
          }}
        >Book a Slot</button>
      </div>

      {/* Initial Confirmation Modal */}
      {showModal && (
        <div className="absolute top-0 left-0 right-0 h-full w-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 rounded-2xl">
          <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[400px]">
            <h2 className="text-xl text-black font-bold mb-4">
              Do you want to track this parking?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={startTracking}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-300 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for already tracked parking */}
      {showTrackingModal && (
        <div className="absolute top-0 left-0 right-0 h-full w-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[400px]">
            <h2 className="text-xl text-black font-bold mb-4">
              This parking is already being tracked.
            </h2>
            <div className="flex justify-between">
              <button
                onClick={() => setShowTrackingModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingBox;
