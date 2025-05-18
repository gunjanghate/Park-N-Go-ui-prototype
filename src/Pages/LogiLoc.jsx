import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import marker from "../Components/icons/parked.png";
import userMarker from "../Components/icons/boxtruck.png";
import axios from "axios";
import backarr from "../assets/back-arrow.png";
import P from "../assets/P.png";
import clock from "../assets/clock.png";
import addressicon from "../assets/address.png";
import line from "../assets/distance.png";
import { backendUrl } from '../assets/scripts/utils'
// ParkingBox component as provided
const LogiBox = ({ 
    name,
    distance,
    expected,
    address,
    image,
  }) => {
    return (
      <div className="flex flex-col w-[80vw] sm:w-[300px] border border-gray-300 rounded-3xl overflow-hidden bg-white shadow-md transform transition-transform duration-50 hover:scale-100 active:scale-110 hover:bg-gray-100">
        <img
          // src={image ? image : P}
          src={`${backendUrl()}/static/sampleParking3.png`}
          alt="Parking"
          className="w-full h-[220px] object-cover p-3 rounded-3xl"
        />
        <div className="pt-1 px-4 pb-4">
          <div className="flex flex-row mx-2 sm:flex-row justify-between items-start sm:items-center">
            <div className="c11 flex flex-col gap-3">
              <div className="c1 flex items-center text-sm font-bold text-gray-600 mb-2 sm:mb-0 gap-2">
                <img src={P} alt="P" className="w-7" />
                <p>{name}</p>
              </div>
              <div className="c2 flex items-center text-sm font-bold text-gray-600 mb-2 sm:mb-0 gap-2">
                <img src={clock} alt="" className="w-7" />
                <p>{((parseFloat(distance))/1000).toFixed(1)} km</p>
              </div>
              <div className="c3 flex items-center text-sm font-bold text-gray-600 mb-2 sm:mb-0 gap-2">
                <img src={addressicon} alt="" className="w-7" />
                <p>{address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

// Custom component to fly to a location
const FlyToLocation = ({ lat, lng }) => {
  const map = useMap(); // Access the map instance
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 15, { animate: true, duration: 0.5 }); // Fly to the location with animation
    }
  }, [lat, lng, map]); // Run this effect when lat or lng changes
  return null; // This component does not render anything itself
};

// ParkingOnmap Component where the map and parking data is displayed
const LogiLoc = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { lat: initialLat, lng: initialLng } = location.state || {
    lat: 20.5937, // Default latitude (India)
    lng: 78.9629, // Default longitude (India)
  };
  const [lat, setLat] = useState(initialLat); // User's current latitude
  const [lng, setLng] = useState(initialLng); // User's current longitude
  // const [storeLat, setStoreLat] = useState(initialLat); // For store's latitude
  // const [storeLng, setStoreLng] = useState(initialLng); // For store's longitude

  const [address, setAddress] = useState(""); // Store user's address
  const [selectedStore, setSelectedStore] = useState(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const panelRef = useRef(null);
  const [storeList, setStoreList] = useState([]);
  const [cityUser, setcityUser] = useState("");
  const [stateUser, setstateUser] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchUserAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const addressData = response.data.address;
      setcityUser(addressData.city);
      setstateUser(addressData.state);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Fetch parking data whenever cityUser or stateUser changes
  useEffect(() => {
    if (cityUser && stateUser) {
      setLoading(true); // Show loader before making the API call
      axios
        .get(
          `${backendUrl()}/getParkings?lat=${lat}&long=${lng}&city=${cityUser}&state=${stateUser}`
        )
        .then((response) => {
          setStoreList(response.data.parkings);
        })
        .catch((error) => console.error("Error fetching parking data:", error))
        .finally(() => {
          setLoading(false); // Hide loader after the API call
        });
    }
  }, [lat, lng, cityUser, stateUser]);

  // Fetch address whenever lat or lng changes
  useEffect(() => {
    fetchUserAddress(lat, lng);
  }, [lat, lng]);

  // const fetchAddress = async (latitude, longitude) => {
  //   try {
  //     const response = await axios.get(
  //       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  //     );
  //     setAddress(response.data.display_name);
  //   } catch (error) {
  //     console.error("Error fetching address:", error);
  //   }
  // };

  // Custom icon for parking markers
  const customIcon = new L.Icon({
    iconUrl: marker,
    iconSize: [30, 40],
  });

  // Custom icon for the user's current location marker
  const customIconUser = new L.Icon({
    iconUrl: userMarker,
    iconSize: [30, 40],
  });

  // Function to handle the click on ParkingBox card and fly to the corresponding location
  const handleCardClick = (lat, lng) => {
    setLat(lat);
    setLng(lng);
  };

  return (
    <div className="merged-component">
      <main className="relative z-0">
        {/* Go back button */}
        <div className="back absolute top-2 right-2 bg-white rounded-full  text-white  z-[2000] motion-preset-slide-left motion-delay-300">
          <button
            onClick={() => {
              navigate("/logicard", {
                state: { lat, lng }, // Properly wrap `state` inside an object
              });
            }}
          >
            <img src={backarr} alt="" className="w-6 h-7 mx-2 my-1" />
          </button>
        </div>

        {/* Map container */}
        <div className="h-[100vh] w-[100vw]">
          <MapContainer
            center={[lat, lng]}
            zoom={13}
            style={{ height: "60%", width: "100%", zIndex: "900" }}
          >
            <TileLayer
              url="https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=b3a0689a59104875a48e7b0370951490"
              attribution=""
            />
            {/* Markers for stores */}
            {storeList && storeList.length > 0 ? (
              storeList.map((shop, index) => {
                const lat = shop.lat || 0; // Replace 0 with actual latitude logic
                const lng = shop.long || 0; // Replace 0 with actual longitude logic

                return (
                  <Marker position={[lat, lng]} icon={customIcon} key={index}>
                    <Popup>
                      <div>
                        <p>
                          <strong>{shop.name}</strong>
                        </p>
                        <p>Available Car Slots: {shop.car_spots}</p>
                        <p>Available Bike Slots: {shop.bike_spots}</p>
                        <p>Distance: {((parseFloat(shop.distance))/1000).toFixed(1)} km</p>
                        <p>Time: {shop.time}</p>
                        <img
                          src="http://localhost:8000/static/sampleParking3.png"
                          // src={shop.image}
                          alt={shop.name}
                          style={{
                            width: "100px",
                            height: "auto",
                            marginTop: "10px",
                          }}
                        />
                        <button
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
                              "_blank"
                            )
                          }
                          className="bg-blue-500 text-white rounded-full px-3 py-1 mt-2 hover:bg-blue-700"
                        >
                          Navigate
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                );
              })
            ) : (
              <p>No stores available to display</p>
            )}

            {/* Marker for user's current location */}
            {/* Marker for user's current location */}
            <Marker position={[initialLat, initialLng]} icon={customIconUser}>
              <Popup>Your Location</Popup>
            </Marker>

            {/* Fly to the user's current location */}
            <FlyToLocation lat={lat} lng={lng} />
          </MapContainer>
        </div>

        {/* Parking Slider */}
        <div
          ref={panelRef}
          className={`absolute left-0 right-0 motion-preset-slide-up ${
            isSearchExpanded
              ? "top-0 min-h-screen rounded-b-3xl bg-transparent  "
              : "min-h-[5vh] bottom-0 rounded-t-3xl bg-transparent"
          } text-white drop-shadow-2xl flex flex-col items-center justify-center gap transition-all duration-1000 overflow-scroll`}
          style={{ zIndex: "2000" }}
        >
          {/* Parking Cards as Slider */}
          {loading && (
            <div className="absolute inset-0 flex justify-center  items-center bg-opacity-50 bg-gray-500 z-50">
              <div className="spinner-border text-white animate-spin w-12 h-12 border-4 rounded-full"></div>
              <span className="sr-only">Loading...</span>
            </div>
          )}

          <div className="w-full min-h-[40vh] mt-4 flex justify-start items-center overflow-x-scroll gap-24 bg-custom-gradient p-4 rounded-t-2xl">
            {storeList.length > 0 ? (
              storeList.map((store, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(store.lat, store.long)}
                  className="flex flex-col w-64 cursor-pointer"
                >
                 <LogiBox 
                key={index}store
                name={store.name}
                distance={store.distance}
                expected={store.expected}
                address={store.address}
                image={store.image}
              />
                </div>
              ))
            ) : (
              <div className="text-center text-white flex justify-center items-center text-2xl">No Parking spaces to show.</div>
            )}
          </div>
          <div
            className={`changeLoc flex justify-center items-center py-1 font-bold border-t-2 border-[#6159B7] ${
              isSearchExpanded ? "text-black" : "text-black"
            } h-full w-full bg-[#6159B7]`}
          >
            <button
              onClick={() => {
                navigate("/logistics");
              }}
            >
              ← Change Location.
            </button>
          </div>

          {/* Change location button */}
        </div>
      </main>
    </div>
  );
};

export default LogiLoc;
