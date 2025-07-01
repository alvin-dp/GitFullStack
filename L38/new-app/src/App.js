import logo from './logo.svg';
import './App.css';
import {ButtonRed,ButtonYellow} from './components/Buttons';
import { useState } from 'react';

let showBlue  = true;

function App() {
  const [showBlue,setShowBlue] = useState(false);
  const textNameButton = showBlue ? "magic yellow" : "Bloody Red"
  const ButtonToRender  = showBlue ? ButtonYellow : ButtonRed
  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
          <ButtonToRender name={textNameButton} onClick={()=>{setShowBlue(!showBlue)}}/>     
      
      </header>
    </div>
  );
}

export default App;
