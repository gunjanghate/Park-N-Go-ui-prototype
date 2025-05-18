import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import { Navigation, Pagination } from 'swiper/modules'; // Import modules from 'swiper/modules'
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import assets for the parking box component
import P from "../assets/P.png";
import Car from "../assets/car.png";
import clock from "../assets/clock.png";
import priceicon from "../assets/price.png";
import bike from "../assets/bike.png";
import addressicon from "../assets/address.png";

// ParkingBox component for each slide
const ParkingBox = ({ name, price, distance, carspots, bikespots, address, image }) => {
  return (
    <div
      className="flex flex-col w-full sm:w-[300px] border border-gray-300 rounded-3xl overflow-hidden bg-white shadow-md transform transition-transform duration-50 hover:scale-100 active:scale-110 hover:bg-gray-100"
    >
      <img src={image} alt="Parking" className="w-full h-[220px] object-cover p-3 rounded-3xl" />
      <div className="pt-1 px-4 pb-4">
        <div className="flex flex-row mx-2 sm:flex-row justify-between items-start sm:items-center">
          <div className="c11 flex flex-col gap-3">
            <div className="c1 flex items-center text-sm font-bold text-gray-600 mb-2 sm:mb-0 gap-2">
              <img src={P} alt="P" className="w-7" />
              <p>{name}</p>
            </div>
            <div className="c2 flex items-center text-sm font-bold text-gray-600 mb-2 sm:mb-0 gap-2">
              <img src={clock} alt="" className="w-7" />
              <p>{distance}</p>
            </div>
            <div className="c3 flex items-center text-sm font-bold text-gray-600 mb-2 sm:mb-0 gap-2">
              <img src={addressicon} alt="" className="w-7" />
              <p>{address}</p>
            </div>
          </div>

          <div className="c22 flex flex-col gap-3">
            <div className="c4 flex items-center text-sm font-bold text-gray-600 mb-2 sm:mb-0 gap-2">
              <img src={priceicon} alt="" className="w-7" />
              <p>Rs {price}</p>
            </div>
            <div className="c5 flex items-center text-sm font-bold text-gray-600 gap-2">
              <img src={Car} alt="" className="w-7" />
              <p>{carspots} spots</p>
            </div>
            <div className="c6 flex items-center text-sm font-bold text-gray-600 gap-2">
              <img src={bike} alt="" className="w-7" />
              <p>{bikespots} spots</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RandomSlider = ({ handleCardClick }) => {
  const slides = [
    { id: 1, name: 'Parking Lot 1', lat: 21.1458, lng: 79.0882, price: 70, distance: '5 km', carspots: 15, bikespots: 5, address: 'Address 1', image: 'https://via.placeholder.com/300x220?text=Parking+1' },
    { id: 2, name: 'Parking Lot 2', lat: 21.1450, lng: 79.0900, price: 80, distance: '3 km', carspots: 20, bikespots: 10, address: 'Address 2', image: 'https://via.placeholder.com/300x220?text=Parking+2' },
    { id: 3, name: 'Parking Lot 3', lat: 21.1400, lng: 79.0850, price: 90, distance: '6 km', carspots: 25, bikespots: 8, address: 'Address 3', image: 'https://via.placeholder.com/300x220?text=Parking+3' },
    { id: 4, name: 'Parking Lot 4', lat: 21.1480, lng: 79.1000, price: 100, distance: '7 km', carspots: 30, bikespots: 12, address: 'Address 4', image: 'https://via.placeholder.com/300x220?text=Parking+4' },
    { id: 5, name: 'Parking Lot 5', lat: 21.1500, lng: 79.1100, price: 110, distance: '4 km', carspots: 35, bikespots: 15, address: 'Address 5', image: 'https://via.placeholder.com/300x220?text=Parking+5' },
    { id: 6, name: 'Parking Lot 6', lat: 21.1550, lng: 79.1200, price: 120, distance: '2 km', carspots: 40, bikespots: 18, address: 'Address 6', image: 'https://via.placeholder.com/300x220?text=Parking+6' },
  ];

  return (
    <div style={{ padding: '10px', maxWidth: '100%', overflowX: 'hidden' }}>
      <Swiper
        direction="horizontal"
        loop={true}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1.2}
        centeredSlides={true}
        modules={[Navigation, Pagination]} // Keep both modules
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div onClick={() => handleCardClick(slide.lat, slide.lng)}>
              <ParkingBox
                name={slide.name}
                price={slide.price}
                distance={slide.distance}
                carspots={slide.carspots}
                bikespots={slide.bikespots}
                address={slide.address}
                image={slide.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hide pagination dots */}
      <style>{`
        .swiper-pagination {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RandomSlider;

