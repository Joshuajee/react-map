import React, {useCallback, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { GoogleMap, useJsApiLoader} from '@react-google-maps/api';
//import {stringify} from 'flatted';
import { saveRoute, loadMap } from '../actions';
import Inputs from './Inputs';
import Directions from './Directions';

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
    };
}


function Map(props) {

    const [position, setPosition] = useState({ lat: 5.51122, lng:  6.04821}) 
    const [map, setMap] = useState(props.map)


    //localStorage.setItem('map', stringify(map))
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })


    /*
    function onPlaceChanged () {
        if (this.autocomplete !== null) {
          console.log(this.autocomplete.getPlace())
        } else {
          console.log('Autocomplete is not loaded yet!')
        }
      }
*/

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
        zoom={18}
        onLoad={onLoad}
        onUnmount={onUnmount}
        >

        <Inputs />

        {
            (props.origin !== '' && props.destination !== '') && (<Directions origin={props.origin} destination={props.destination} /> ) 
        } 

    </GoogleMap>

  ) : <div> Loading </div>
}

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Map))


