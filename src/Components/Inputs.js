import { connect } from "react-redux";
import { useState } from "react";
import { saveDestination, saveOrigin, saveRoute } from "../actions";
import Search from "./Search";

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

    return (
        <div className="inputs">

            <Search 
                setPlace={setOrigin}
                placeholder="Where are you now"
                defaultValue={props.origin} />
            <Search 
                setPlace={setDestination}
                placeholder="Where do you want to go"
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