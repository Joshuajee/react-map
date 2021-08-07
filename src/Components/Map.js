import React, {useCallback, useState, useEffect} from 'react'
import { GoogleMap, useJsApiLoader, DirectionsRenderer} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};


function Map() {

    let [position, setPosition] = useState(null) 
    const [map, setMap] = useState(null)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);

            const location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            setPosition(location)
          });
    })

    

 

  

  

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  if(position === null) return <div>Must Allow Postion</div>

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={500}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)

//export default Map

