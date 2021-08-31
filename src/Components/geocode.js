import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion(process.env.REACT_APP_GOOGLE_REGION);

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
//Geocode.enableDebug();

// Get address from latitude & longitude.
const addressFromCoordinate = (latitude, longitude, setData) => Geocode.fromLatLng(latitude, longitude).then(
  (response) => {
    const address = response.results[0].formatted_address;
    setData(address)
  },
  (error) => {
    console.error(error);
    setData("")
  }
);

// Get formatted address, city, state, country from latitude & longitude when
// Geocode.setLocationType("ROOFTOP") enabled
// the below parser will work for most of the countrie


// Get latitude & longitude from address.
const coordinateFromAddress = (address, setData) => Geocode.fromAddress(address).then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
    setData({lat:lat, lng:lng})
  },
  (error) => {
    console.error(error);
  }
);


export default addressFromCoordinate
export {coordinateFromAddress}
