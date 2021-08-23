import React, {useCallback, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { GoogleMap, useJsApiLoader} from '@react-google-maps/api';
//import {stringify} from 'flatted';
import { saveRoute, loadMap, saveOrigin } from '../actions';
import Inputs from './Inputs';
import Directions from './Directions';
import Search from './Search'

import addressFromCoordinate from './geocode'

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const mapStateToProps = state => {
    return { 
        map: state.map,
        route: state.route,
        origin: state.origin,
        destination: state.destination
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        loadMap: map => dispatch(loadMap(map)),
        saveRoute: route => dispatch(saveRoute(route)),
        saveOrigin: origin => dispatch(saveOrigin(origin)),
    };
}


function Map(props) {

    const [position, setPosition] = useState({ lat: 5.51122, lng:  6.04821}) 
    
    const [, setMap] = useState(props.map)


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        libraries: ['places'],
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
            addressFromCoordinate(location.lat, location.lng, props.saveOrigin)

            setPosition(location)
            props.saveOrigin(location)
          });
    }, [])


  const onLoad =  useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
    props.loadMap(map)
  }, [props])

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

        

        <Inputs  origin={props.origin} />

        {
            (props.origin !== '' && props.destination !== '') && (<Directions origin={props.origin} destination={props.destination} /> ) 
        } 

    </GoogleMap>

  ) : <div> Loading </div>
}

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Map))


