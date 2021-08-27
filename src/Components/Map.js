import React, {useCallback, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import {loadMap, saveOrigin } from '../redux/actions';
import Inputs from './Inputs';
import Directions from './Directions';
import addressFromCoordinate from './geocode';

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

  const [position, setPosition] = useState({ lat: 5.51122, lng:  6.04821}) 
  
  const [, setMap] = useState(map)


  const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      libraries: ['places', 'geometry'],
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })


  //get initial position
  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(function(position) {
      
      console.log("Latitude is :", position.coords.latitude)
      console.log("Longitude is :", position.coords.longitude)

      const location = { lat: position.coords.latitude, lng: position.coords.longitude }

      addressFromCoordinate (location.lat, location.lng, saveOrigin)
      setPosition(location)
    })
  }, [saveOrigin])

  //watch position
  useEffect(() => {
    
    navigator.geolocation.watchPosition(function(position) {
      
      console.log("Latitude is :", position.coords.latitude)
      console.log("Longitude is :", position.coords.longitude)

      const location = { lat: position.coords.latitude, lng: position.coords.longitude }

      //addressFromCoordinate (location.lat, location.lng, saveOrigin)
      console.log("Pos: " + position.coords.latitude)
      setPosition(location)
    })
  }, [saveOrigin])

  const onLoad =  useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
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
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      >

      <Inputs origin={origin} />

      {
        (origin !== '' && destination !== '') && (<Directions origin={origin} destination={destination} /> ) 
      } 

  </GoogleMap>

  ) : <div> Loading </div>
}

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Map))


