import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

export default function GoogleMapComponent({ location, sendEventPlanners }) {
  const [points, setPoints] = useState([]); // To store the coordinates
  const [error, setError] = useState(null); // To store error message
  const [center, setCenter] = useState({ lat: 7.290572, lng: 80.633728 }); // Default center
  const [isLoading, setIsLoading] = useState(false);

  const containerStyle = {
    width: "50%",
    height: "300px",
  };

  // Function to calculate the center of multiple coordinates
  function getCenter(locations) {
    if (!locations || locations.length === 0) {
      return { lat: 7.290572, lng: 80.633728 }; // Return default if no locations
    }
    
    let validLocations = locations.filter(loc => 
      typeof loc.lat === 'number' && !isNaN(loc.lat) && 
      typeof loc.lng === 'number' && !isNaN(loc.lng)
    );
    
    if (validLocations.length === 0) {
      return { lat: 7.290572, lng: 80.633728 }; // Return default if no valid locations
    }
    
    let totalLat = 0, totalLng = 0;
    
    validLocations.forEach(loc => {
      totalLat += loc.lat;
      totalLng += loc.lng;
    });
    
    return {
      lat: totalLat / validLocations.length,
      lng: totalLng / validLocations.length
    };
  }

  useEffect(() => {
    if (!location) {
      sendEventPlanners([]);
      setPoints([]);
      return; // Don't fetch if no location
    }

    async function fetchLocation() {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(
          `http://localhost:5000/planner/getAll?city=${encodeURIComponent(location)}`
        );

        if (response.data && response.data.length === 0) {
          sendEventPlanners([]);
          setPoints([]);
          setError("No event planners found in this location.");
        } else if (response.data) {
          sendEventPlanners(response.data);
          
          const locationData = response.data.map(planner => ({
            lat: parseFloat(planner.latitude),
            lng: parseFloat(planner.longitude)
          }));
          
          // Filter out any invalid coordinates (NaN)
          const validLocationData = locationData.filter(loc => 
            !isNaN(loc.lat) && !isNaN(loc.lng)
          );
          
          if (validLocationData.length === 0) {
            setError("Location data contains invalid coordinates.");
            setPoints([]);
          } else {
            const calculatedCenter = getCenter(validLocationData);
            setCenter(calculatedCenter);
            setPoints(validLocationData);
          }
        }
      } catch (error) {
        console.error("API error:", error);
        setError("Error fetching location data. Please try again.");
        setPoints([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLocation();
  }, [location]);

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {isLoading && <div>Loading map data...</div>}
      
      <div className="test">
      <LoadScript googleMapsApiKey="AIzaSyDPAch9ytTzrC3y6Pj2I-9if22EEz4iT3s">
        {!error && points.length > 0 && (
        
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={9}>
              {points.map((point, index) => (
                <MarkerF key={index} position={point} />
              ))}
            </GoogleMap>
       
        )}
           </LoadScript>
      </div>
    </div>
  );
}