import React, { useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../assets/scripts/utils';

export default function Fetcher() {

  useEffect(() => {
    axios.post(`${backendUrl()}/searchParkings`, {
      lat: 21.1939,
      long: 79.104,
      city: 'Nagpur',
      state: 'Maharashtra'
    })
    .then(response => {
      console.log(response.data); 
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  }, []);

  return (
    <div>
      Hola
    </div>
  );
}
