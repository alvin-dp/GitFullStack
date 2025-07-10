import logo from './logo.svg';
import './App.css';
import AxiosAsyncGetPostsById from './components/AxiosAsyncGetPostsById';


function App() {

  return (
    <div className="App">
      <header className="App-header">
       <img src={logo} className="App-logo" alt="logo" />        
          <AxiosAsyncGetPostsById/>
      </header>
    </div>
  );
}

export default App;
