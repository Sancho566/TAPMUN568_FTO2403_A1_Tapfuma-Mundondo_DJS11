import React, { useEffect, useState } from 'react';
import ShowCarousel from './ShowCarousel';

const LandingPage = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    // Fetch shows data for the carousel
    fetch('https://podcast-api.netlify.app')
      .then(response => response.json())
      .then(data => {
        // Select a subset of shows for the carousel
        setShows(data.slice(0, 10)); // Show the first 10 shows or modify as needed
      });
  }, []);

  return (
    <div>
      <h1>Recommended Shows</h1>
      <ShowCarousel shows={shows} />
    </div>
  );
};

export default LandingPage;
