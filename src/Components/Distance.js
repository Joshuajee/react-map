import { DistanceMatrixService } from '@react-google-maps/api';
import { saveDistance, saveTime } from '../redux/actions';
import {connect} from 'react-redux'
import { coordinateFromAddress } from './geocode';
import { useState, useEffect } from 'react';
import Overlay from './Overlay';

const mapStateToProps = state => {
    return { 
        origin: state.origin,
        destination: state.destination,
        distance: state.distance,
        time: state.time,
    };
};
  
  
const mapDispatchToProps = dispatch => {
    return {
        saveDistance: distance => dispatch(saveDistance(distance)),
        saveTime: time => dispatch(saveTime(time)),
    };
}

const Distance = (props) => {

    const [origin, setOrigin] = useState(null)
    const [destination, setDestination] = useState(null)

    const onLoad = distanceMatrixService => {
        console.log('DistanceMatrixService: ', distanceMatrixService)
    }

    useEffect(() => {
        coordinateFromAddress(props.origin, setOrigin)
        coordinateFromAddress(props.destination, setDestination)
    }, [props.origin, props.destination])

    function distanceCallback (response) {

        if (response !== null) {

            const data = response?.rows[0]?.elements[0]

            if (data.status === 'OK') {

                props.saveDistance(data?.distance?.text)
                props.saveTime(data?.duration?.text)

            } else {

                console.log('response: ', response)

            }

        }

    }

    return (
        <div>

            {
               ( (origin && destination) &&
                    <DistanceMatrixService 
                        callback={ distanceCallback }
                        options={ {origins:[origin], destinations:[destination], travelMode:['DRIVING'] } }
                        onLoad= { onLoad }
                        /> )
            }

            {
               ( (origin && destination) && 
                    <Overlay 
                        position={origin}
                        distance={props.distance}
                        duration={props.time}
                        /> )
            }

        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Distance)