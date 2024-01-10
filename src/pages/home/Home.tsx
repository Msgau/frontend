
import React, { useState, useEffect } from 'react';
import Header from "../../components/header/Header";
import GoogleMap from "../../components/googleMap/GoogleMap";

const Home: React.FC = () => {
  const [parisCafe, setParisCafe] = useState([
    {
      id: 'paris1',
      latitude: 48.8566,
      longitude: 2.3522,
      name: 'Paris Cafe',
    },
  ]);

  useEffect(() => {
    // Vous pouvez effectuer des appels API ici pour obtenir les cafés de Paris
    // Mise à jour de l'état parisCafe avec les résultats
  }, []);

  return (
    <div>
      <Header />
      <div className="home">
        <GoogleMap cafes={parisCafe} />
      </div>
    </div>
  );
};

export default Home;