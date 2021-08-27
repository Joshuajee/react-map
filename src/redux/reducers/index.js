//import {parse} from 'flatted';
import { MAP, ROUTE, ORIGIN, DESTINATION } from "../constants/action-types";

const initialState = {
   map: null,
   route: null,
   origin: '',
   destination: '',
};
  
function rootReducer(state = initialState, action) {

    console.log("Action Type", action.type)

    switch (action.type) {
        case MAP:
            return { ...state, map: action.payload }
        case ROUTE:
            return { ...state, route: action.payload } 
        case ORIGIN:
            return { ...state, origin: action.payload }
        case DESTINATION:
            return { ...state, destination: action.payload }
        default:
            return state
    }

};
  

export default rootReducer;