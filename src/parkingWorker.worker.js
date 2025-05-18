let intervalId = null;

self.onmessage = (event) => {
  const { action, carspotsLeft, bikespotsLeft, parkingName } = event.data;

  if (action === "startTracking") {
    clearInterval(intervalId); // Clear any existing interval to avoid duplicates

    intervalId = setInterval(() => {
      const message = `Spots left for ${parkingName} are:\nCar: ${carspotsLeft}\nBike: ${bikespotsLeft}`;
      self.postMessage({ message });
    }, 10000); // Notify every 10 seconds
  } else if (action === "stopTracking") {
    clearInterval(intervalId); // Stop the interval when tracking is stopped
    intervalId = null; // Reset interval ID
  }
};
