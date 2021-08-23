import { Autocomplete} from "@react-google-maps/api"
import  {useState} from 'react'

const Search = (props) => {

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
        <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
          >

        <input
            type="text"
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
        />

        </Autocomplete>
    )

}

export default Search