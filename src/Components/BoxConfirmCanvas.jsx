import React, { useEffect, useRef } from 'react';
import imageSrc from '../assets/sampleParking.png';

const BoxConfirmCanvas = ({ spots }) => {
  const canvasRef = useRef(null);

  spots = {"car_spots":[[[20.5998006362915,322.758],[20.5998006362915,208.5],[83.1498006362915,208.5],[82.3158006362915,322.758]],[[82.3158006362915,322.758],[141.5298006362915,321.924],[144.0318006362915,208.5],[84.8178006362915,208.5]]],"bike_spots":[]}


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.font = '16px Arial';
      ctx.fillStyle = 'blue';

      spots['car_spots'].forEach((spot, index) => {
        ctx.beginPath();
        ctx.moveTo(spot[0][0], spot[0][1]);
        for (let i = 1; i < spot.length; i++) {
          ctx.lineTo(spot[i][0], spot[i][1]);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fillText(`Spot ${index + 1}`, spot[0][0] + 5, spot[0][1] - 5);
      });

      ctx.strokeStyle = 'blue';
      spots['bike_spots'].forEach((spot, index) => {
        ctx.beginPath();
        ctx.moveTo(spot[0][0], spot[0][1]);
        for (let i = 1; i < spot.length; i++) {
          ctx.lineTo(spot[i][0], spot[i][1]);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fillText(`Spot ${index + 1}`, spot[0][0] + 5, spot[0][1] - 5);
      });
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

    const handleClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      spots.forEach((spot, index) => {
        if (isPointInPolygon(clickX, clickY, spot.coordinates)) {
          alert(`You clicked on Spot ${index + 1}`);
        }
      });
    };

    canvas.addEventListener('click', handleClick);
    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, [imageSrc, spots]);

  return <canvas ref={canvasRef} style={{ border: '1px solid black' }}></canvas>;
};

export default BoxConfirmCanvas;
