import { connect } from "react-redux";
import { useState } from "react";
import { saveDestination, saveOrigin } from "../actions";

const mapStateToProps = state => {
    return { 
        origin: state.origin,
        destination: state.destination
    };
  };
  
  
const mapDispatchToProps = dispatch => {
    return {
        saveOrigin: origin => dispatch(saveOrigin(origin)),
        saveDestination: destination => dispatch(saveDestination(destination))
    };
}
  

const Inputs = (props) => {

    const [origin, setOrigin] = useState(props.origin)
    const [destination, setDestination] = useState(props.destination)

    return (
        <div className="inputs">
            <input 
                type="text" 
                name="origin" 
                placeholder="current location"
                onChange={(e) => {
                    setOrigin(e.target.value)
                 } }
                />

            <input 
                type="text" 
                name="destination" 
                placeholder="Where do you want to go"
                onChange={(e) => {
                    setDestination(e.target.value)
                } }
                />

            <button
                onClick={

                    () => {
                        
                        props.saveOrigin(origin)
                        props.saveDestination(destination)
                        props.setOrigin(origin)
                        props.setDestination(destination)
                        setOrigin(origin)
                        setDestination(destination)
                        //props.setSearch(true)
                    }
                }
                >Go
            </button>
        </div>
        )
}

export default connect( mapStateToProps, mapDispatchToProps)(Inputs)