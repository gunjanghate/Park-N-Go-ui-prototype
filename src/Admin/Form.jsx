import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import SmallScreenErrorComponent from "../Components/SmallScreenError";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { getCSRFToken, backendUrl } from "../assets/scripts/utils";
import adminDrop from "../Pages/AdminDrop"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import pinic from "../assets/dropPin.png"
import backarr from "../assets/back-arrow.png"
 
const ParkingSpaceForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Destructure lat and lng from the location state
    // const { lat, lng } = location.state || { lat: null, lng: null }
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);
    const [menuOpen, setMenuOpen] = useState(false);
    const [numCameras, setNumCameras] = useState(0);
    const [cameraUrls, setCameraUrls] = useState([]);
    const [isdrop, setIsdrop] = useState(false)
    const [pin, setPin] = useState(null);
    const [lat, setlat] = useState(0)
    const [lng, setlng] = useState(0)
    const MapClickHandler = () => {
        const map = useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;

                // Update pin state and fly to the clicked location
                setPin({ lat, lng });
                map.flyTo([lat, lng], 14, { duration: 1.5 });
            },
        });
        return null;
    };

    // Handle confirm button click
    const handleConfirmLocation = () => {
        if (pin) {
            setIsdrop(false)
            setlat(pin.lat) // Navigate with state
            setlng(pin.lng) // Navigate with state
            console.log(lat, lng)
        } else {
            alert("Please drop a pin to select your location first!");
        }
    };
    // State to store a single pin
    const handleClick = () => {
        setIsdrop(true);
    };
    const customIcon = new L.Icon({
        iconUrl: pinic, // URL to marker icon
        iconSize: [40, 41], // Size of the icon
        iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    });
    useEffect(() => {
        console.log(lat, lng);
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 640);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleNumCamerasChange = (e) => {
        const newNumCameras = parseInt(e.target.value, 10) || 0;
        if (newNumCameras >= 0) {
            setCameraUrls((prevUrls) => {
                const updatedUrls = [...prevUrls];
                if (newNumCameras > prevUrls.length) {
                    // Add new empty fields for additional cameras
                    return [...updatedUrls, ...Array(newNumCameras - prevUrls.length).fill("")];
                } else if (newNumCameras < prevUrls.length) {
                    // Trim the array to match the new number of cameras
                    return updatedUrls.slice(0, newNumCameras);
                }
                return updatedUrls; // No change if the count is the same
            });
            setNumCameras(newNumCameras);
        }
    };

    const handleCameraUrlChange = (index, value) => {
        const updatedUrls = [...cameraUrls];
        updatedUrls[index] = value;
        setCameraUrls(updatedUrls);
    };


    const handleForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        data['lat'] = lat;
        data['long'] = lng;
        data['camera_urls'] = [];
        data['is_smart'] = document.getElementById('is_smart').checked ? 1 : 0;

        document.querySelectorAll("form .cameras").forEach((camera, index) => {
            data['camera_urls'].push(camera.value);
        });

        axios.post(`${backendUrl()}/createParking`, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),
            },
            withCredentials: true
        }).then((response) => {
            alert(response.data);
            navigate('/admin/dashboard');
        }).catch((error) => {
            console.log(error.response);
        }
        );
    };


    if (isSmallScreen) {
        return <SmallScreenErrorComponent />;
    }

    return (
        <div className="min-h-screen bg-custom-gradient flex flex-col">
            {/* Header */}
            <header className="w-full min-h-[10vh] rounded-b-2xl flex justify-between items-center px-4 py-3">
                <div className="flex items-center">
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
            <main className="flex-grow flex items-center justify-center relative">
                {isdrop&&
                <div className="drop-container absolute top-14 h-[65vh] flex justify-center items-center max-w-[80vw] left-36 ri z-[1000]">
                    <div className="relative">
                        <div className="back absolute top-2 right-2 bg-white rounded-full  text-white  z-[2000] motion-preset-slide-left motion-delay-300">
                            <button
                                onClick={() => {
                                    setIsdrop(false);
                                }}
                            >
                                <img src={backarr} alt="" className="w-6 h-7 mx-2 my-1" />
                            </button>
                        </div>
                        <div className="panel flex flex-col justify-center items-center absolute bottom-0 left-0 right-0 bg-custom-gradient rounded-t-2xl z-[2000] h-36 gap-4">
                            <h1 className="text-xl font-semibold">
                                {/* {pin
                              ? `Dropped Pin Coordinates: Latitude ${pin.lat.toFixed(
                                  4
                                )}, Longitude ${pin.lng.toFixed(4)}`
                              : ""} */}
                                Tap on the map to drop a pin

                            </h1>
                            <button
                                onClick={handleConfirmLocation}
                                className="py-3 px-5 bg-black/80 text-white drop-shadow-2xl  rounded-3xl"
                            >
                                Confirm My Location
                            </button>
                        </div>
                        <MapContainer
                            center={[21.1458, 79.0882]} // Default center (India)
                            zoom={5}
                            style={{ height: "100vh", width: "100vw" }}
                        >
                            {/* Tile Layer from OpenStreetMap */}
                            <TileLayer
                                url="https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=b3a0689a59104875a48e7b0370951490"
                                attribution=''
                            />

                            {/* Add click handler to the map */}
                            <MapClickHandler />

                            {/* Render a single pin */}
                            {pin && (
                                <Marker
                                    position={[pin.lat, pin.lng]}
                                    icon={customIcon} // Custom icon for the marker
                                />
                            )}
                        </MapContainer>
                    </div>

                </div>
}
                <div className="w-11/12 max-w-4xl bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-xl font-semibold text-center text-gray-700 mb-6">
                        Parking Space Details
                    </h1>
                    <form className="grid grid-cols-3 gap-6" onSubmit={handleForm}>
                        {[
                            { id: "firstName", label: "First Name", placeholder: "Enter first name" },
                            { id: "lastName", label: "Last Name", placeholder: "Enter last name" },
                            { id: "email", label: "Email", placeholder: "Enter email" },
                            { id: "contact", label: "Phone Number", placeholder: "Enter phone number" },
                            { id: "name", label: "Parking Space Name", placeholder: "Enter name" },
                            { id: "address", label: "Address", placeholder: "Enter address" },
                            { id: "city", label: "City", placeholder: "Enter city" },
                            { id: "state", label: "State", placeholder: "Enter state" },
                            { id: "pincode", label: "Pincode", placeholder: "Enter pincode" },
                            { id: "slots", label: "Slots Provided", placeholder: "Enter slots provided" },
                            { id: "two_wheeler_price", label: "Cost of 2 Wheeler", placeholder: "Enter cost" },
                            { id: "four_wheeler_price", label: "Cost of 4 Wheeler", placeholder: "Enter cost" },
                            { id: "image", label: "Profile Image", placeholder: "Enter url, http:// https://" },
                        ].map((field) => (
                            <div key={field.id} className="col-span-1">
                                <label
                                    htmlFor={field.id}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {field.label}
                                </label>
                                <input
                                    type="text"
                                    id={field.id}
                                    name={field.id}
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#68BBE3] focus:outline-none"
                                    placeholder={field.placeholder}
                                />
                            </div>
                        ))}
                        <div className="col-span-1">
                            <button onClick={handleClick} className="w-full py-2 bg-custom-gradient text-white font-semibold rounded-md hover:bg-[#68BBE3] transition">Drop a Pin</button>
                        </div>

                        {/* Number of Cameras */}
                        <div className="col-span-1">
                            <label htmlFor="numCameras" className="block text-sm font-medium text-gray-700">
                                Number of Cameras
                            </label>
                            <input
                                type="number"
                                id="numCameras"
                                value={numCameras}
                                onChange={handleNumCamerasChange}
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#68BBE3] focus:outline-none"
                                placeholder="Enter number of cameras"
                            />
                        </div>

                        <div></div>
                        {/* Smart Parking Checkbox */}
                        <div className="col-span-1 flex items-center">
                            <input
                                type="checkbox"
                                id="is_smart"
                                name="is_smart"
                                value={1}
                                className="h-4 w-4 text-[#68BBE3] border-gray-300 rounded focus:ring-[#68BBE3]"
                            />
                            <label htmlFor="smartParking" className="ml-2 block text-sm font-medium text-gray-700">
                                Smart Parking (Transmittable Cameras)
                            </label>
                        </div>

                        {/* Camera URLs */}
                        {cameraUrls.map((url, index) => (
                            <div key={`camera-${index}`} className="col-span-3">
                                <label
                                    htmlFor={`cameraUrl-${index}`}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Camera {index + 1} URL
                                </label>
                                <input
                                    type="text"
                                    id={`cameraUrl-${index}`}
                                    value={url}
                                    onChange={(e) => handleCameraUrlChange(index, e.target.value)}
                                    className="cameras mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#68BBE3] focus:outline-none"
                                    placeholder={`Enter URL for Camera ${index + 1}`}
                                />
                            </div>
                        ))}

                        {/* Submit Button */}
                        <div className="col-span-3">
                            <button
                                type="submit"
                                className="w-full py-2 bg-custom-gradient text-white font-semibold rounded-md hover:bg-[#68BBE3] transition"
                                onClick={()=>{
                                    navigate("/admin/imageEditor")
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            {/* Footer */}
            <footer className="w-full rounded-t-2xl text-center py-2 text-white text-xs sm:text-sm">
                &copy; 2024 ParkSmart ~ All rights reserved
            </footer>
        </div>
    );
};

export default ParkingSpaceForm;
