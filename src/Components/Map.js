import React, {useCallback, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import {loadMap, saveOrigin } from '../redux/actions';
import Inputs from './Inputs';
import Directions from './Directions';
import addressFromCoordinate from './geocode';
import MarkPosition from './MarkPosition';

const libraries = ['places']

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const mapStateToProps = state => {
    return { 
        map: state.map,
        origin: state.origin,
        destination: state.destination
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        loadMap: map => dispatch(loadMap(map)),
        saveOrigin: origin => dispatch(saveOrigin(origin)),
    };
}


function Map(props) {

  const {saveOrigin, origin, destination, loadMap, map} = props

  const [position, setPosition] = useState(null) 
  
  const [, setMap] = useState(map)


  const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      libraries: libraries,
      region: process.env.REACT_APP_GOOGLE_REGION,
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })


  //get position
  useEffect(() => {
    
    navigator.geolocation.watchPosition(function(position) {
      
      console.log("Latitude is :", position.coords.latitude)
      console.log("Longitude is :", position.coords.longitude)

      const location = { lat: position.coords.latitude, lng: position.coords.longitude }

      addressFromCoordinate (location.lat, location.lng, saveOrigin)
      
      setPosition(location)
    }, error => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.")
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.")
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.")
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.")
          break;
        default:
          alert("GPS Not Enabled Please Enable it.")
      }
    })
  }, [saveOrigin])


 
  const onLoad =  useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    /*
    let infoWindow = new window.google.maps.InfoWindow({
      content: "Click the map to get Lat/Lng!",
      position: position,
    });
    infoWindow.open(map);
    */
    setMap(map)
    loadMap(map)
  }, [loadMap])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (

    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      clickableIcons={true}
      zoom={20}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick= {(e) => console.log(e) }
      region= {process.env.REACT_APP_GOOGLE_REGION}
      >

      <Inputs origin={origin} />

      {
        (origin !== '' && destination !== '') && (<Directions origin={origin} destination={destination} /> ) 
      } 

      { (position && <MarkPosition position={position} />) }

  </GoogleMap>

  ) : <div> Loading </div>
}

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Map))