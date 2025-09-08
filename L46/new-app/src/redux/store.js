import { configureStore } from '@reduxjs/toolkit' 
import {counterReducer} from './reducer' 
import {counterReducerRTK, dataReducerRTK} from './reducerRTK'
import createSagaMiddleware from 'redux-saga';
import counterSagaReducer from './counterSagaSlice'
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer:{counterReducer,counterReducerRTK,dataReducerRTK,counterSagaReducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

//export type RootState = ReturnType<typeof store.getState>

export default store