import { configureStore } from '@reduxjs/toolkit' 
import {counterReducer} from './reducer' 
import {counterReducerRTK} from './reducerRTK'

const store = configureStore({
  reducer:{counterReducer,counterReducerRTK},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store