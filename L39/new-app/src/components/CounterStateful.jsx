import { useState } from 'react';

function CounterButton (props) {
  const [count, setCount] = useState(0)

  return (
    <div>
      {props.title}: {count}      
      <p>
        <button onClick={() => setCount(count + 1)}>increase</button>
        <button onClick={() => setCount(count - 1)}>decrease</button>      
      </p>
    </div>
  )
}

export default CounterButton