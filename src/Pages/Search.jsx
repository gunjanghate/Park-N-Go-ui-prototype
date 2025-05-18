import React, { useState, useEffect } from "react";
import ParkingBox from "../Components/ParkingBox";
import P from "../assets/P.png";
import axios from "axios";
import { backendUrl } from '../assets/scripts/utils'

const Search = ({ lat, lng, cityUser, stateUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [parkingdata, setParkingData] = useState([]);
  
  useEffect(() => {
    if (cityUser && stateUser) {
      axios
        .get(
          `${backendUrl()}/getParkings?lat=${lat}&long=${lng}&city=${cityUser}&state=${stateUser}`
        )
        .then((response) => {
          setParkingData(response.data.parkings); // Use response.data directly with axios
        })
        .catch((error) => console.error("Error fetching parking data:", error));
    }
  }, [lat, lng, cityUser, stateUser]);

  const [filteredParkingData, setFilteredParkingData] = useState(parkingdata);

  // Filter and sort parking data
  useEffect(() => {
    let filteredData = parkingdata;

    // Apply search filter if there is a search term
    if (searchTerm) {
      filteredData = filteredData.filter((parking) => {
        const matchesSearch =
          parking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          parking.address.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
      });
    }

    // Apply sorting based on filterBy selection
    filteredData = filteredData.sort((a, b) => {
      if (!filterBy) return 0; // No sorting if no filter selected

      switch (filterBy) {
        case "distance":
          return parseInt(a.distance) - parseInt(b.distance); // Sorting by distance (ascending)
        case "price":
          return parseInt(a.price) - parseInt(b.price); // Sorting by price (ascending)
        case "carspots":
          return parseInt(b.carspots) - parseInt(a.carspots); // Sorting by carspots (descending)
        case "bikespots":
          return parseInt(b.bikespots) - parseInt(a.bikespots); // Sorting by bikespots (descending)
        default:
          return 0;
      }
    });

    setFilteredParkingData(filteredData);
  }, [searchTerm, filterBy, parkingdata]);

  return (
    <div className="bg-transparent">
      <div className="p-4 space-y-6 bg-transparent flex flex-col ">
        <div>
          <div className="search-filter flex gap-4 mb-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by Parking name"
              className="border-2 border-gray-300 rounded-lg p-2 flex-grow text-black drop-shadow-sm motion-preset-slide-down-md motion-delay-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Filter Dropdown */}
            <select
              className="border-2 drop-shadow-sm rounded-lg p-2 text-black motion-preset-slide-down-md motion-delay-300 border-gray-300"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="distance">Distance</option>
              <option value="price">Price</option>
              <option value="carspots">Car Spots</option>
              <option value="bikespots">Bike Spots</option>
            </select>
          </div>

          <h1 className="text-2xl text-gray-800 font-bold">
            Parkings Available Near You!
          </h1>

          {filteredParkingData.length > 0 ? (
            <>
              {filteredParkingData.map((parking, index) => (
                <ParkingBox
                  key={index}
                  id={parking.id}
                  name={parking.name}
                  carprice={parking.four_wheeler_price}
                  bikeprice={parking.two_wheeler_price}
                  distance={((parseFloat(parking.distance))/1000).toFixed(1)}
                  carspots={parking.car_spots}
                  bikespots={parking.bike_spots}
                  time={parking.time}
                  address={parking.address}
                  image={`${backendUrl()}`+parking.image}
                />
              ))}
            </>
          ) : (
            <p className="text-gray-500 flex justify-center items-center">No parking spots match your criteria .</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
