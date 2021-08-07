import React, {useCallback, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { GoogleMap, useJsApiLoader, DirectionsRenderer, DirectionsService} from '@react-google-maps/api';
import { saveDirectionalResponse, loadMap } from '../actions';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const mapStateToProps = state => {
    return { 
        map: state.map,
        directionalResponse: state.directionalResponse
    };
  };
  
  
const mapDispatchToProps = dispatch => {
    return {
        loadMap: map => dispatch(loadMap(map)),
        saveDirectionalResponse: directionalResponse => dispatch(saveDirectionalResponse(directionalResponse)),
    };
}
  


function Map(props) {

    function directionsCallback (response) {
        console.log(response)
    
        if (response !== null) {
          if (response.status === 'OK') {
            props.saveDirectionalResponse(response)
          } else {
            console.log('response: ', response)
          }
        }
      }

    let [position, setPosition] = useState(null) 
    const [map, setMap] = useState(props.map)

    console.log(map)

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
    }, [props])


  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
    props.loadMap(map)
  }, [props])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  if(position === null) return <div>Must Allow Postion</div>

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        clickableIcons={true}
        zoom={18}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <DirectionsService
            // required
            options={{ 
            destination: 'Warri',
            origin: 'Ughelli',
            travelMode: 'DRIVING'
            }}
            // required
            callback={directionsCallback}
            // optional
            onLoad={directionsService => {
            console.log('DirectionsService onLoad directionsService: ', directionsService)
            }}
            // optional
            onUnmount={directionsService => {
            console.log('DirectionsService onUnmount directionsService: ', directionsService)
            }}
        />

        <DirectionsRenderer
            // required
            options={{ 
            directions: props.directionalResponse
            }}
            // optional
            onLoad={directionsRenderer => {
            console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
            }}
            // optional
            onUnmount={directionsRenderer => {
            console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
            }}
        />

      </GoogleMap>
  ) : <div> Loading </div>
}

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Map))
