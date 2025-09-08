import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counters',
  initialState: {countHome:0, 
                countAbout:0},
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

const dataSlice = createSlice({
  name: 'fetchedData',
  initialState: {loading:false,
                 data:null,
                error:null},
  reducers: {
    fetch_data_request(state, action ) 
        {           
            state.loading  =  true;          
        },
    fetch_data_success(state, action ) 
        {             
            state.data      =  action.payload; 
            state.loading   =  false;
        },
    fetch_data_failure(state, action ) 
        {             
            state.error  =  action.payload; 
            state.loading   =  false;
        }                
  }  
});

export const { increment_home_RTK, decrement_home_RTK,increment_about_RTK,decrement_about_RTK } = counterSlice.actions;
export const counterReducerRTK = counterSlice.reducer;

export const { fetch_data_request,fetch_data_success,fetch_data_failure } = dataSlice.actions;
export const dataReducerRTK  = dataSlice.reducer;
