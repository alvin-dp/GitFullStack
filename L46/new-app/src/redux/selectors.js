
  const globalCount = (state) => state.counterReducer;
  const globalCountRTK = (state) => state.counterReducerRTK;
  const fetchDataRTK = (state) => state.dataReducerRTK;
  const counterSagaSlice = (state) => state.counterSagaReducer;
  export {globalCount,globalCountRTK,fetchDataRTK,counterSagaSlice}