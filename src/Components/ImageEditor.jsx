import React, { useRef, useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import nextIcon from '../assets/next.svg';
import prevIcon from '../assets/prev.svg';
import carModeIcon from '../assets/car.svg';
import bikeModeIcon from '../assets/bike.svg';
import eraseIcon from '../assets/erase.svg';
import undoIcon from '../assets/undo.svg';
import eraseAllIcon from '../assets/eraseAll.svg';
import { backendUrl } from '../assets/scripts/utils';
import loading from "../Components/ImageEditor.jsx"
export default function ImageEditor() {
    const canvasRef = useRef(null);
    const [canvasImages, setCanvasImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0, factor: 0, requiredHeight: 500 });
    const [drawMode, setDrawMode] = useState('none'); // Current drawmode
    const [currentPoints, setCurrentPoints] = useState([]); // Points for the current rectangle being drawn
    const [spots, setSpots] = useState([]); // State to store spots for car and bike spots
    const [menuOpen, setMenuOpen] = useState(false);

    // when the page loads, fetch images and create spots array
    useEffect(() => {
        const fetchImages = async () => {
            try {
                // const backendUrl = 'http://'+location.hostname+':8000';
                const response = await fetch(`${backendUrl()}/getSampleImages`);
                const data = await response.json();

                const loadedImages = await Promise.all(
                    data.images.map((imageData) => {
                        return new Promise((resolve) => {
                            const img = new Image();
                            img.src = `data:image/jpeg;base64,${imageData}`;
                            img.onload = () => resolve(img);
                        });
                    })
                );
                setCanvasImages(loadedImages);
                setSpots(new Array(loadedImages.length).fill({ car_spots: [], bike_spots: [] }));
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    // Re-render drawing whenever images, current image, or spots change
    useEffect(() => {
        if (canvasImages.length > 0) {
            setCurrentPoints([]);
            redrawCanvas();
        }
    }, [canvasImages, currentImageIndex, spots, drawMode]);

    const handleCanvasClick = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (drawMode === 'addCar' || drawMode === 'addBike') {
            setCurrentPoints((prevPoints) => {
                const newPoints = [...prevPoints, [x, y]]; // Store points as lists [x, y]
                draw(newPoints);
                return newPoints;
            });
        }
        if (drawMode === 'erase') {
            let spotRemoved = false;
            ['car_spots', 'bike_spots'].forEach((mode) => {
                if (spotRemoved) return;
                spots[currentImageIndex][mode].forEach((spot, index) => {
                    if (isPointInPolygon(x, y, spot)) {
                        setSpots((prevSpots) => {
                            const updatedSpots = [...prevSpots];
                            updatedSpots[currentImageIndex] = {
                                ...updatedSpots[currentImageIndex],
                                [mode]: updatedSpots[currentImageIndex][mode].filter((_, i) => i !== index),
                            };
                            return updatedSpots;
                        });
                        spotRemoved = true;
                    }
                });
            });
        }
    }

    const redrawCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const currentImage = canvasImages[currentImageIndex];
        canvas.height = imageDimensions.requiredHeight;
        canvas.width = currentImage.width * (imageDimensions.requiredHeight / currentImage.height);

        ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);

        spots[currentImageIndex]?.car_spots.forEach((spot, index) => {
            drawRectangle(ctx, spot, index + 1, 'car');
        });
        spots[currentImageIndex]?.bike_spots.forEach((spot, index) => {
            drawRectangle(ctx, spot, index + 1, 'bike');
        });
    }

    const draw = (newPoints = currentPoints) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'red';
        ctx.strokeStyle = '#6439FF';
        ctx.lineWidth = 2;

        newPoints.forEach((point, index) => {
            ctx.beginPath();
            ctx.arc(point[0], point[1], 5, 0, Math.PI * 2);
            ctx.fill();

            if (index > 0) {
                ctx.beginPath();
                ctx.moveTo(newPoints[index - 1][0], newPoints[index - 1][1]);
                ctx.lineTo(point[0], point[1]);
                ctx.stroke();
            }
        });

        // rectangle is complete
        if (newPoints.length === 4) {
            ctx.beginPath();
            ctx.moveTo(newPoints[3][0], newPoints[3][1]);
            ctx.lineTo(newPoints[0][0], newPoints[0][1]);
            ctx.stroke();

            // Update the spots state with the new quadrilateral
            setSpots((prevSpots) => {
                const updatedSpots = [...prevSpots];
                if (drawMode === 'addCar') {
                    updatedSpots[currentImageIndex] = {
                        ...updatedSpots[currentImageIndex],
                        car_spots: [...updatedSpots[currentImageIndex].car_spots, newPoints],
                    };
                } else if (drawMode === 'addBike') {
                    updatedSpots[currentImageIndex] = {
                        ...updatedSpots[currentImageIndex],
                        bike_spots: [...updatedSpots[currentImageIndex].bike_spots, newPoints],
                    };
                }
                return updatedSpots;
            });
        }
    };

    const drawRectangle = (ctx, points, squareNumber, type) => {
        ctx.strokeStyle = type === 'car' ? '#FFEB55' : '#D91656';
        if (type === 'bike') squareNumber = 'B' + squareNumber;
        else squareNumber = 'C' + squareNumber;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        points.forEach((point, index) => {
            if (index < 3) {
                ctx.lineTo(points[index + 1][0], points[index + 1][1]);
            }
        });
        ctx.lineTo(points[0][0], points[0][1]);
        ctx.stroke();

        // Display the square number at the center of the rectangle
        const centerX = (points[0][0] + points[1][0] + points[2][0] + points[3][0]) / 4;
        const centerY = (points[0][1] + points[1][1] + points[2][1] + points[3][1]) / 4;
        ctx.fillStyle = 'black';
        ctx.font = '20px cursive';
        ctx.fillText(`${squareNumber}`, centerX, centerY);
    };

    const isPointInPolygon = (x, y, polygon) => {
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i][0], yi = polygon[i][1];
            const xj = polygon[j][0], yj = polygon[j][1];
            const intersect = (yi > y !== yj > y) && (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    };

    const dump = () => {
        for(let i=0; i<spots.length; i++) {
            let xfactor = canvasImages[i].height / imageDimensions.requiredHeight;
            let yfactor = canvasImages[i].height / imageDimensions.requiredHeight;
            let spot_copy = {car_spots: [], bike_spots: []};
            for(let j=0; j<spots[i].car_spots.length; j++) {
                let spot = spots[i].car_spots[j];
                let new_spot = [];
                for(let k=0; k<spot.length; k++) {
                    new_spot.push([spot[k][0]*xfactor, spot[k][1]*yfactor]);
                }
                spot_copy.car_spots.push(new_spot);
            }
            for(let j=0; j<spots[i].bike_spots.length; j++) {
                let spot = spots[i].bike_spots[j];
                let new_spot = [];
                for(let k=0; k<spot.length; k++) {
                    new_spot.push([spot[k][0]*xfactor, spot[k][1]*yfactor]);
                }
                spot_copy.bike_spots.push(new_spot);
            }

            console.log(JSON.stringify(spot_copy));
        }
    }

    const nextImageFunc = () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % canvasImages.length);
    const prevImageFunc = () => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + canvasImages.length) % canvasImages.length);
    const drawModeFunc = (newDrawMode) => {
        newDrawMode != drawMode ? setDrawMode(newDrawMode) : false;
    }
    const undoFunc = () => {
        if (drawMode === 'addCar' || drawMode === 'addBike') {
            const updatedPoints = currentPoints.slice(0, -1);
            setCurrentPoints(updatedPoints);
            redrawCanvas();
            draw(updatedPoints);
        }
    }
    const eraseAllFunc = () => {
        let confirmation = confirm('Are you sure you want to erase all spots?');
        if (!confirmation) return;
        setSpots((prevSpots) => {
            const updatedSpots = [...prevSpots];
            updatedSpots[currentImageIndex] = { car_spots: [], bike_spots: [] };
            return updatedSpots;
        });
    }

    /*
    Draw mode options:
    addCar - add to car_spots
    addBike - add to bike_spots
    Erase - onclick of a box it gets erased
    
    additional features:
    nextImage
    prevImage
    Erase All - erase all boxes
    undo - undo last click
    */

    if (canvasImages.length === 0) {
        return <loading/>;
    }
    return (
        <div className='bg-custom-gradient h-[100vh]'>
            <div className='flex flex-col items-center justify-center'>
                <header className="w-full min-h-[8vh] rounded-b-2xl flex justify-between items-center px-4 py-3 motion-preset-slide-down motion-delay-300">
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
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    Admin Controls
                                </li>
                            </ul>
                        </div>
                    )}
                </header>
                <div className='flex flex-col motion-preset-slide-down-md items-center justify-center text-white mb-2'>
                    <h1 className='text-xl font-semibold'>Please select the Parking Spaces</h1>
                </div>
                <canvas ref={canvasRef} onClick={handleCanvasClick} className='rounded-lg cursor-crosshair motion-preset-expand'></canvas>
                <div className='flex flex-row items-center justify-center motion-preset-slide-up-md motion-delay-300'>
                <div className="flex flex-row justify-center items-center gap-6 mt-4 px-3 ml-6 py-3 bg-white bg-opacity-30 rounded-full">
                    
                    <button onClick={prevImageFunc} className='mr-8'>
                        <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                            <img src={prevIcon} alt="Previous" className="w-5 h-5" />
                        </div>
                        <span className="absolute bottom-full mb-1 hidden text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm group-hover:block">
                            Previous Image
                        </span>
                    </button>

                    <button
                        onClick={() => drawModeFunc('addCar')}
                        className={`border-4 rounded-full ${drawMode === 'addCar' ? 'border-blue-500' : 'border-transparent'}`}
                    >
                        <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                            <img src={carModeIcon} alt="Car Mode" className="w-5 h-5" />
                        </div>
                        <span className="absolute bottom-full mb-1 hidden text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm group-hover:block">
                            Add Car Spot
                        </span>
                    </button>

                    <button
                        onClick={() => drawModeFunc('addBike')}
                        className={`border-4 rounded-full ${drawMode === 'addBike' ? 'border-blue-500' : 'border-transparent'}`}
                    >
                        <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                            <img src={bikeModeIcon} alt="Bike Mode" className="w-5 h-5" />
                        </div>
                        <span className="absolute bottom-full mb-1 hidden text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm group-hover:block">
                            Add Bike Spot
                        </span>
                    </button>

                    <button
                        onClick={() => drawModeFunc('erase')}
                        className={`border-4 rounded-full ${drawMode === 'erase' ? 'border-blue-500' : 'border-transparent'}`}
                    >
                        <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                            <img src={eraseIcon} alt="Erase" className="w-5 h-5" />
                        </div>
                        <span className="absolute bottom-full mb-1 hidden text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm group-hover:block">
                            Erase Spot
                        </span>
                    </button>

                    <button onClick={undoFunc}>
                        <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                            <img src={undoIcon} alt="Undo" className="w-5 h-5" />
                        </div>
                        <span className="absolute bottom-full mb-1 hidden text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm group-hover:block">
                            Undo Last Action
                        </span>
                    </button>

                    <button onClick={eraseAllFunc}>
                        <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                            <img src={eraseAllIcon} alt="Erase All" className="w-5 h-5" />
                        </div>
                        <span className="absolute bottom-full mb-1 hidden text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm group-hover:block">
                            Erase All
                        </span>
                    </button>

                    <button onClick={nextImageFunc} className='ml-8'>
                        <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                            <img src={nextIcon} alt="Next" className="w-5 h-5" />
                        </div>
                        <span className="absolute bottom-full mb-1 hidden text-xs text-gray-700 bg-white px-2 py-1 rounded shadow-sm group-hover:block">
                            Next Image
                        </span>
                    </button>
                </div>
                <div className='ml-8 mt-6'><button className='bg-white rounded-full px-4 py-2' onClick={dump}>Submit</button></div>
                </div>
            </div>                       
        </div>
    );
}
