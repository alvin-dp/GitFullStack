import logo from './logo.svg';
import './App.css';
import CounterStateful from './components/CounterStateful';
import HeaderStateless from './components/HeaderStateless';
import ClassCounterStateful from './components/ClassCounterStateful';
import InputUncontroled from './components/InputUncontroled';
import InputUncontroledWithRef from './components/InputUncontroledWithRef';
import InputControled from './components/InputControled';
import UseEffectAsyncDataFetch from './components/UseEffectAsyncDataFetch';
//import { useState } from 'react';


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <HeaderStateless name='Function stateful Components'/>

        <CounterStateful title='Counter 1' />
{/*         <img src={logo} className="App-logo" alt="logo" /> */}
        <div>
          <HeaderStateless name='Class stateful example'/>
          <ClassCounterStateful name='Class counter 1' />
       </div>
        <div>
          <HeaderStateless name='Uncontroled elements'/>
          <InputUncontroled inputLabel='Enter something to console: ' buttonLabel = 'Check' />
          <br></br>
          <InputUncontroledWithRef inputLabel='Enter something to alert: ' buttonLabel = 'Control'/>
          <br></br>
        </div>
        <div>
          <HeaderStateless name='Controled elements'/>
          <InputControled inputLabel='Enter something to console: '/>
        </div>
        <div>
          <HeaderStateless name="Async UseEffect"/>
          <UseEffectAsyncDataFetch  postId='35'/>
          <UseEffectAsyncDataFetch  postId='12'/>
        </div>

      </header>
    </div>
  );
}

export default App;
