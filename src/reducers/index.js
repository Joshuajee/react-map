//import {parse} from 'flatted';
import { MAP, DIRECTIONAL_RESPONSE, ORIGIN, DESTINATION } from "../constants/action-types";

const initialState = {
   map: null,
   directionalResponse: null,
   origin: null,
   destination: null,
};
  
function rootReducer(state = initialState, action) {

    let updatedState = {}

    switch (action.type) {
        case MAP:
            updatedState = { ...state, map: action.payload }
        break  
        case DIRECTIONAL_RESPONSE:
            updatedState = { ...state, directionalResponse: action.payload }
        break  
        case ORIGIN:
            updatedState = { ...state, origin: action.payload }
        break  
        case DESTINATION:
            updatedState = { ...state, destination: action.payload }
        break  
        default:
            console.log("No")
    }

    console.log(updatedState)
   
    return updatedState;
};
  

export default rootReducer;