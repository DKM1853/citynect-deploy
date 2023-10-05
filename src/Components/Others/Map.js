import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

function MapContainer(props) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  
  const usedLocations = {};

  function adjustLocation(lat, lon) {
    const key = `${lat},${lon}`;
    let count = usedLocations[key] || 0;

    // Adjust the location slightly for each additional property
    const offset = count * 0.0001; 
    usedLocations[key] = count + 1;

    return {
      lat: lat + offset,
      lon: lon + offset
    };
  }

  const onMarkerClick = (props, marker) => {
    setActiveMarker(marker);
    setSelectedPlace(props);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: props.height }}>
      <Map
        google={props.google}
        zoom={11}
        initialCenter={{
          lat: !isNaN(props.addresses[0].coordinates[0]) ? props.addresses[0].coordinates[0] : 23.0225,
          lng: !isNaN(props.addresses[0].coordinates[1]) ? props.addresses[0].coordinates[1] : 72.5714,
        }}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        {props.addresses.map((address, index) => {
          if (
            !isNaN(address.coordinates[0]) &&
            !isNaN(address.coordinates[1])
          ) {
            const adjustedLocation = adjustLocation(address.coordinates[0], address.coordinates[1]);
            return (
              <Marker
                key={index}
                position={{
                  lat: adjustedLocation.lat,
                  lng: adjustedLocation.lon,
                }}
                onClick={onMarkerClick}
                name={address.label}
                link={address.link}
              />
            );
          } else {
            return(
              <Marker
                key={index}
                position={{ lat: 23.0225, lng: 72.5714 }}
                onClick={onMarkerClick}
                name={address.label}
                link={address.link}
              />
            )
          }
        })}

        <InfoWindow marker={activeMarker} visible={!!activeMarker}>
          <div>
            <a href={selectedPlace?.link}>
              <span>{selectedPlace && selectedPlace.name}</span>
            </a>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);