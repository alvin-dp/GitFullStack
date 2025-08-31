import { useDispatch, useSelector } from 'react-redux'
import {incrementCounter,decrementCounter,incrementCounterAbout,decrementCounterAbout} from '../redux/actions'
import { useLocation } from 'react-router-dom';
import { globalCount } from '../redux/selectors';

function CounterStateful (props) {

  const location  = useLocation();

  const isHome  = location.pathname === '/';
  const counts = useSelector(globalCount);
  const count    = (isHome) ? counts.countHome : counts.countAbout;
  const iCounter = (isHome) ? incrementCounter : incrementCounterAbout;
  const dCounter = (isHome) ? decrementCounter : decrementCounterAbout;

  const dispatch= useDispatch();
  return (
    <div>
      {props.title}: {count}      
      <p>
        <button onClick={() => dispatch(iCounter())}>increase</button>
        <button onClick={() => dispatch(dCounter())}>decrease</button>      
      </p>
      <p>
        <button onClick={() => dispatch(iCounter(10))}>increase by 10</button>
        <button onClick={() => dispatch(dCounter(10))}>decrease by 10</button>      
      </p>      
    </div>
  )
}

export default CounterStateful