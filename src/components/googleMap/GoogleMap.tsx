import { useEffect, useState } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import config from '../../../config.ts';
import './GoogleMap.scss';

const MapComponent = () => {
  const containerStyle = {
    width: '90%',
    height: '75vh',
  };

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Fonction pour obtenir la position de l'utilisateur
    const getUserLocation = async () => {
      if (navigator.geolocation) {
        // Utilisation de l'API de géolocalisation de Google Maps pour obtenir une estimation de la position
        try {
          const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${config.googleMapsApiKey}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const result = await response.json();
            setUserLocation({
              lat: result.location.lat,
              lng: result.location.lng,
            });
          } else {
            console.error('Erreur lors de la récupération de la position avec Google Maps API:', response.statusText);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération de la position avec Google Maps API:', error);
        }
      } else {
        console.error("La géolocalisation n'est pas prise en charge par ce navigateur.");
      }

      // Utilisation de l'API du navigateur pour obtenir la position de l'utilisateur
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error('Erreur de géolocalisation:', error);
          }
        );
      } else {
        console.error("La géolocalisation n'est pas prise en charge par ce navigateur.");
      }
    };

    // Appel de la fonction pour obtenir la position de l'utilisateur
    getUserLocation();
  }, []); // Exécuter une seule fois lors du montage du composant

  const handleSearch = (e) => {
    e.preventDefault();
    // Logique de recherche ici...
    console.log('Recherche effectuée !');
  };

  const center = userLocation || { lat: 48.705047607421875, lng: 2.4535863399505615 };

  return (
    <div className='gMapsBloc'>
      <div className='gMapsSearch'>
        <form onSubmit={handleSearch}>
          <input type="text" placeholder="Entrez votre recherche" />
          <button type="submit">Rechercher</button>
        </form>
      </div>
      <div className='gMapsMap'>
        <LoadScript googleMapsApiKey={config.googleMapsApiKey}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
            {userLocation && <Marker position={userLocation} title="Votre emplacement" />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MapComponent;
