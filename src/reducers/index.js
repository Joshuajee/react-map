import { MAP, DIRECTIONAL_RESPONSE } from "../constants/action-types";


const initialState = {
   map: null,
   directionalResponse: null,
};
  
function rootReducer(state = initialState, action) {

    switch (action.type) {
        case MAP:
            state.map = action.payload
        break  
        case DIRECTIONAL_RESPONSE:
            state.directionalResponse = action.payload
        break  
        default:
            console.log("No")
    }
   
    return state;
};
  

export default rootReducer;