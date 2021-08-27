import {DirectionsRenderer, DirectionsService} from '@react-google-maps/api';
import { saveRoute} from '../redux/actions';
import {connect} from 'react-redux'

const mapStateToProps = state => {
    return { 
        route: state.route
    };
  };
  
  
const mapDispatchToProps = dispatch => {
    return {
        saveRoute: route => dispatch(saveRoute(route)),
    };
}

const Directions = (props) => {

    function directionsCallback (response) {

        if (response !== null) {
            if (response.status === 'OK') {
                if(props.route === null) props.saveRoute(response)
                else if (
                    (response.request.destination.query !== props.route.request.destination.query) &&
                    (response.request.origin.query !== props.route.request.origin.query)
                ) props.saveRoute(response)
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
                    
                    (props.route !== null) && (
                        <DirectionsRenderer
                            options={{ 
                                directions: props.route
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