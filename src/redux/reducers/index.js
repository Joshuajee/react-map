import { 
    MAP, 
    ROUTE, 
    POSITION,
    ORIGIN, 
    DESTINATION, 
    DISTANCE, 
    TIME,
    CHOOSE } from "../constants/action-types";

const initialState = {
   map: null,
   route: null,
   position: null,
   origin: '',
   destination: '',
   distance: '',
   time: '',
   choose: '',
};
  
function rootReducer(state = initialState, action) {

    console.log("Action Type", action.type)

    switch (action.type) {
        case MAP:
            return { ...state, map: action.payload }
        case ROUTE:
            return { ...state, route: action.payload } 
        case POSITION:
                return { ...state, positon: action.payload }
        case ORIGIN:
            return { ...state, origin: action.payload }
        case DESTINATION:
            return { ...state, destination: action.payload }
        case DISTANCE:
            return { ...state, distance: action.payload }
        case TIME:
            return { ...state, time: action.payload }
        case CHOOSE:
            return { ...state, choose: action.payload }
        default:
            return state
    }

};
  

export default rootReducer;