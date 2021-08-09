import { useState } from 'react';
import {DirectionsRenderer, DirectionsService} from '@react-google-maps/api';
import { saveDirectionalResponse} from '../actions';
import {connect} from 'react-redux'

const mapStateToProps = state => {
    return { 
        directionalResponse: state.directionalResponse
    };
  };
  
  
const mapDispatchToProps = dispatch => {
    return {
        saveDirectionalResponse: directionalResponse => dispatch(saveDirectionalResponse(directionalResponse)),
    };
}

const Directions = (props) => {

    const [route, setRoute] = useState(null)

    function directionsCallback (response) {
        console.log(response)
    
        if (response !== null) {
            if (response.status === 'OK') {
                props.saveDirectionalResponse(response)
                setRoute(response)
   
            } else {
                console.log('response: ', response)
            }
        }
    }

    return (
        <div>
            <DirectionsService
                options={{ 
                destination: props.destination,
                origin: props.origin,
                travelMode: 'DRIVING'
                }}
                callback={directionsCallback}
                onLoad={directionsService => {
                console.log('DirectionsService onLoad directionsService: ', directionsService)
                }}
                onUnmount={directionsService => {
                console.log('DirectionsService onUnmount directionsService: ', directionsService)
                }}
            />
                {
                    
                    route && (
                        <DirectionsRenderer
                            options={{ 
                                directions: props.directionalResponse
                            }}
                            onLoad={directionsRenderer => {
                                console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                            }}
                            onUnmount={directionsRenderer => {
                                console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                            }}
                    /> )
                }
            
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Directions)