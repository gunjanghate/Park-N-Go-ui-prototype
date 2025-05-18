import React, { useRef, useState, useEffect } from 'react';
import imgPath from '../assets/sampleParking.png';
import BoxConfirmCanvas from '../Components/BoxConfirmCanvas';

const BoxMarkingCanvas = () => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [quadrilaterals, setQuadrilaterals] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imgPath;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setImgLoaded(true);
    };
  }, [imgPath]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints((prevPoints) => {
      const newPoints = [...prevPoints, [x, y]]; // Store points as lists [x, y]
      draw(newPoints);
      return newPoints;
    });
  };

  const draw = (newPoints) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (imgLoaded) {
      const img = new Image();
      img.src = imgPath;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;

        newPoints.forEach((point, index) => {
          ctx.beginPath();
          ctx.arc(point[0], point[1], 5, 0, Math.PI * 2); // Use point[0] and point[1]
          ctx.fill();

          if (index > 0) {
            ctx.beginPath();
            ctx.moveTo(newPoints[index - 1][0], newPoints[index - 1][1]);
            ctx.lineTo(point[0], point[1]);
            ctx.stroke();
          }
        });

        if (newPoints.length === 4) {
          ctx.beginPath();
          ctx.moveTo(newPoints[3][0], newPoints[3][1]);
          ctx.lineTo(newPoints[0][0], newPoints[0][1]);
          ctx.stroke();

          setQuadrilaterals((prev) => [...prev, newPoints]); // Save quadrilateral as list of lists
          setPoints([]); // Reset points for the next quadrilateral
        }
      };
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{ border: '1px solid black' }}
      />
      <BoxConfirmCanvas quadrilaterals={quadrilaterals} />
    </>
  );
};

export default BoxMarkingCanvas;
