import React, { useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = { lat: 7.290572, lng: 80.633728 };

const GoogleMapEditableMakerComponent = ({ onCityUpdate }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCSijGqniAYKju9p7K-LGaOh7zQfZKfceA", // 🔹 Replace with your API Key
    libraries: ["places"], // ✅ Add "places" for Geocoding
  });

  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [city, setCity] = useState("Please drag the marker to detect the city");

  if (loadError) return <p>❌ Error loading maps</p>;
  if (!isLoaded) return <p>⏳ Loading maps...</p>;

  // 🏷️ Function to get city name using Geocoding API
  const getCityName = async (lat, lng) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCSijGqniAYKju9p7K-LGaOh7zQfZKfceA`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.results.length > 0) {
        // Find city from address components
        const addressComponents = data.results[0].address_components;
        const cityComponent = addressComponents.find((comp) =>
          comp.types.includes("administrative_area_level_2")
        );

        if (cityComponent) {
          setCity(cityComponent.long_name); // ✅ Update city state
          onCityUpdate(cityComponent.long_name, lat, lng);
        } else {
            const cityComponent2nd = addressComponents.find((comp) =>
                comp.types.includes("locality")
              );
              if(cityComponent2nd){
                setCity(cityComponent.long_name); // ✅ Update city state
                onCityUpdate(cityComponent.long_name, lat, lng);
              }else{
                setCity("Unknown Location");
                onCityUpdate("", lat, lng);
              }
              
        }
      } else {
        setCity("No results found");
        onCityUpdate("", lat, lng);
      }
    } catch (error) {
      console.error("Error fetching city name:", error);
      setCity("Error fetching city");
      onCityUpdate("", lat, lng);
    }
  };

  // 🏷️ Handle marker drag event
  const handleMarkerDragEnd = async (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();

    setMarkerPosition({ lat: newLat, lng: newLng });
    await getCityName(newLat, newLng); // ✅ Fetch city name
  };

  return (
    <div>
      {/* ✅ Google Map Component */}
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={markerPosition}>
        {/* ✅ Draggable Marker */}
        <MarkerF
          position={markerPosition} 
          draggable={true} 
          onDragEnd={handleMarkerDragEnd} 
        />
      </GoogleMap>

      {/* ✅ Display Coordinates & City Name */}
      <div style={{ marginTop: "10px" }}>
        <strong>📍 Marker Position:</strong>
        <p><strong>Latitude:</strong> {markerPosition.lat}</p>
        <p><strong>Longitude:</strong> {markerPosition.lng}</p>
        <p><strong>City:</strong> {city}</p> {/* ✅ Print city name */}
      </div>
    </div>
  );
};

export default GoogleMapEditableMakerComponent;
