import { useDispatch, useSelector } from 'react-redux'
import {increment_home_RTK,decrement_home_RTK,increment_about_RTK,decrement_about_RTK} from '../redux/reducerRTK'
import { useLocation } from 'react-router-dom';
import { globalCountRTK } from '../redux/selectors';

function CounterStatefulRTK (props) {

  const location  = useLocation();

  const isHome  = location.pathname === '/';
  const counts = useSelector(globalCountRTK);
  const count    = (isHome) ? counts.countHome : counts.countAbout;
  const iCounter = (isHome) ? increment_home_RTK : increment_about_RTK;
  const dCounter = (isHome) ? decrement_home_RTK : decrement_about_RTK;

  const dispatch= useDispatch();
  return (
    <div>
      {'RTK ' + props.title}: {count}      
      <p>
        <button onClick={() => dispatch(iCounter())}>RTK increase</button>
        <button onClick={() => dispatch(dCounter())}>RTK decrease</button>      
      </p> 
      <p>
        <button onClick={() => dispatch(iCounter(10))}>RTK increase by 10</button>
        <button onClick={() => dispatch(dCounter(10))}>RTK decrease by 10</button>      
      </p>            
    </div>
  )
}

export default CounterStatefulRTK