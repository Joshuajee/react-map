import { Autocomplete} from "@react-google-maps/api"
import  {useState} from 'react'
import { connect } from "react-redux";
import { setChoose } from "../redux/actions";


const mapStateToProps = state => {
    return { 
        origin: state.origin,
        destination: state.destination,
        choose: state.choose
    };
  };
  
  
const mapDispatchToProps = dispatch => {
    return {
      setChoose: choose => dispatch(setChoose(choose)),
    };
}

const Search = (props) => {

    const active = (props.data === props.choose) ? "active" : ""

    const [search, setSearch] = useState(null)

    function onLoad (autocomplete) {

      console.log('autocomplete: ', autocomplete)
      setSearch(autocomplete)

    }
    
    function onPlaceChanged () {
        if (search !== null) {

          const place = search.getPlace()

          props.setPlace(place.name)

          console.log(place)

        } else {
          console.log('Autocomplete is not loaded yet!')
        }
    }

    return (
      <div className="search">
        <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            className="auto"
          >

        <input
          type="text"
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
        />

        </Autocomplete>

        <button 
          onClick={() => props.setChoose(props.data === props.choose ? '' : props.data)}
          className={"choose " + active }> Choose on Map </button>

      </div>
    )

}

export default connect(mapStateToProps, mapDispatchToProps)(Search)