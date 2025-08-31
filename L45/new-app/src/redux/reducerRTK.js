import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counters',
  initialState: {countHome:0, countAbout:0},
  reducers: {
    increment_home_RTK(state, action ) 
        { 
            const addValue = (typeof(action.payload) === 'number') ? action.payload : 1;
            state.countHome += addValue; 

        }
    ,
    decrement_home_RTK(state, action ) 
        { 
            const addValue = (typeof(action.payload) === 'number') ? action.payload : 1;
            state.countHome -= addValue; 

        },
    increment_about_RTK(state, action ) 
        { 
            const addValue = (typeof(action.payload) === 'number') ? action.payload : 1;
            state.countAbout += addValue; 

        },
    decrement_about_RTK(state, action )
        { 
            const addValue = (typeof(action.payload) === 'number') ? action.payload : 1;
            state.countAbout -= addValue; 

        }
  }  
});

export const { increment_home_RTK, decrement_home_RTK,increment_about_RTK,decrement_about_RTK } = counterSlice.actions;

export const counterReducerRTK = counterSlice.reducer;


// import { types } from "./actions";

// const initialState = {countHome:0, countAbout:0}

// function counterReducer (state=initialState,action)
// {
//     console.log(action.type,state);
//     switch (action.type) {
//         case types.ACTION_INCREMENT:           
//             return { ...state, countHome: state.countHome + action.payload}
//         case types.ACTION_DECREMENT:          
//             return { ...state, countHome: state.countHome - action.payload}  
//         case types.ACTION_INCREMENT_ABOUT:          
//             return { ...state, countAbout: state.countAbout + action.payload}   
//         case types.ACTION_DECREMENT_ABOUT:          
//             return { ...state, countAbout: state.countAbout - action.payload}                            
//         default:
//             return state;
//     }
// }


// export {counterReducer}