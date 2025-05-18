import React from "react";
import P from "../assets/P.png";
import clock from "../assets/clock.png";
import addressicon from "../assets/address.png";
import line from "../assets/distance.png";

const LogiBox = ({ 
  name,
  distance,
  expected,
  address,
  image,
}) => {
  return (
    <div className="flex mx-2 mt-4 relative">
      <div
        className="flex flex-col w-full sm:w-[300px] border border-gray-300 rounded-3xl overflow-hidden bg-transparent drop-shadow-xl backdrop-blur-2xl shadow-md transform transition-transform duration-50 hover:scale-100 active:scale-110 hover:bg-gray-100"
      >
        <img
          // src={image ? image : P}
          src="${}/static/sampleParking3.png"
          alt="Parking"
          className="w-full h-[220px] object-cover p-3 rounded-3xl"
        />
        <div className="pt-1 px-4 pb-4">
          <div className="flex flex-row mx-2 sm:flex-row justify-between items-start sm:items-center">
            <div className="c11 flex flex-col gap-3">
              <div className="c1 flex items-center text-sm font-bold text-gray-600 mb-2 sm:mb-0 gap-2">
                <div className="icon1">
                  <img
                    src={P}
                    alt="P"
                    className="w-7"
                  />
                </div>
                <p>{name}</p>
              </div>
              <div className="c3 flex items-center text-sm font-bold text-gray-600 mb-2 sm:mb-0 gap-2">
                <div className="icon3">
                  <img src={addressicon} alt="" className="w-7" />
                </div>
                <p>{address}</p>
              </div>
              <div className="flex justify-between items-center ">
                <div className="c2 flex items-center text-sm font-bold text-gray-600 mb-2 sm:mb-0 gap-2">
                  <div className="icon2">
                    <img src={line} alt="" className="w-7" />
                  </div>
                  <p>{distance}</p>
                </div>
                <div className="c4 flex items-center text-sm font-bold text-gray-600 mb-2 sm:mb-0 gap-1">
                  <img src={clock} alt="" className="w-7" />
                  <p>{(distance / 30).toFixed(2)} min</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogiBox;
