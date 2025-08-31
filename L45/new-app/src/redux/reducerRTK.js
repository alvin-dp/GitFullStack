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
