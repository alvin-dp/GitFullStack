import logo from './logo.svg';
import './App.css';
import CounterButton from './components/CounterStateful';
import Header2Title from './components/HeaderStateless';
import ClassCounter from './components/ClassCounterStateful';
//import { useState } from 'react';


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Header2Title name='Function statful Components'/>

        <CounterButton title='Counter 1' />
        <CounterButton title='Counter 2' />
        <CounterButton title='Counter 3' />
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <Header2Title name='Class statful example'/>
          <ClassCounter name='Class counter 1' />
          <ClassCounter name='Class counter 2' />
          <ClassCounter name='Class counter 3' />
        </div>
      
      </header>
    </div>
  );
}

export default App;
