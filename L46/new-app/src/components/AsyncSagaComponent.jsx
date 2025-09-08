import { useDispatch, useSelector } from 'react-redux'
import { counterSagaSlice } from '../redux/selectors'
import { incrementCounterSagaAsync, decrementCounterSagaAsync } from '../redux/counterSagaSlice'

const AsyncSagaComponent = () => {
  const count = useSelector(counterSagaSlice).count;
  const sw_data = useSelector(counterSagaSlice).data;
  const dispatch = useDispatch()
  const sw_switcher = (count>0) ? count : 0;
  const nameHero   = (sw_data===null) ? 'no data' : sw_data[sw_switcher].name;
  return (
    <div>
      <h2>SAGA Counter: {count}</h2>
      <button onClick={() => dispatch(incrementCounterSagaAsync())}>Increment after 1 second</button>
      <button onClick={() => dispatch(decrementCounterSagaAsync())}>Decrement after 1 second</button>
      <br/>
      <button onClick={() => dispatch({type :'swapiPeople'})}>Get SWAPI Peoples by SAGA</button>
      <p>Swapi Hero : {`${nameHero}`}</p>
    </div>
  )
}

export default AsyncSagaComponent


