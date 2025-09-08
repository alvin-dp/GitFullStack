import { createSlice } from '@reduxjs/toolkit'

export const counterSagaSlice = createSlice({
  name: 'counterSaga',
  initialState: {
    count: 0,
    data:null
  },
  reducers: {
    incrementCounterSaga: (state, action) => {
      state.count += action.payload
    },
    decrementCounterSaga: (state, action) => {
      state.count -= action.payload
    },
    incrementCounterSagaAsync: () => {},
    
    decrementCounterSagaAsync: () => {},
    
    swapiPeopleData:(state, action) => {
      state.data = action.payload
    }
  }
})

export const { incrementCounterSaga, decrementCounterSaga, incrementCounterSagaAsync, decrementCounterSagaAsync, swapiPeopleData } = counterSagaSlice.actions
export default counterSagaSlice.reducer