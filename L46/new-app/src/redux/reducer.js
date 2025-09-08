import { types } from "./actions";

const initialState = {countHome:0, countAbout:0}

function counterReducer (state=initialState,action)
{
    switch (action.type) {
        case types.ACTION_INCREMENT:           
            return { ...state, countHome: state.countHome + action.payload}
        case types.ACTION_DECREMENT:          
            return { ...state, countHome: state.countHome - action.payload}  
        case types.ACTION_INCREMENT_ABOUT:          
            return { ...state, countAbout: state.countAbout + action.payload}   
        case types.ACTION_DECREMENT_ABOUT:          
            return { ...state, countAbout: state.countAbout - action.payload}                            
        default:
            return state;
    }
}


export {counterReducer}