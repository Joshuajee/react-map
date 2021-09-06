import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { saveDestination, saveOrigin, saveRoute } from "../redux/actions";
import Search from "./Search";
import { ORIGIN, DESTINATION } from "../redux/constants/action-types";

const mapStateToProps = state => {
    return { 
        origin: state.origin,
        destination: state.destination
    };
  };
  
  
const mapDispatchToProps = dispatch => {
    return {
        saveOrigin: origin => dispatch(saveOrigin(origin)),
        saveDestination: destination => dispatch(saveDestination(destination)),
        saveRoute: route => dispatch(saveRoute(route)),
    };
}
  

const Inputs = (props) => {

    const [origin, setOrigin] = useState(props.origin)
    const [destination, setDestination] = useState(props.destination)

    useEffect(() => {

        setOrigin(props.origin)
        setDestination(props.destination)

    }, [props.origin, props.destination])

    return (
        <div className="inputs">

            <Search
                setPlace={setOrigin}
                placeholder="Where are you now"
                defaultValue={props.origin} 
                data={ORIGIN}
                />
                
            <Search 
                setPlace={setDestination}
                placeholder="Where do you want to go"
                defaultValue={props.destination} 
                data={DESTINATION}
                />

            <button className="btn"
                onClick={
                            () => {
                                props.saveOrigin(origin)
                                props.saveDestination(destination)
                                props.saveRoute(null)
                            }
                        }
                >Go
            </button>
        </div>
        )
}

export default connect( mapStateToProps, mapDispatchToProps)(Inputs)