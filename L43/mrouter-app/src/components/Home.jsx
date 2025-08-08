import '../App.css';
import CounterStateful from './CounterStateful';


function Home (props) {

    return <div className="App">
        <header className="App-header">

        <h2>Home page</h2>
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
        <CounterStateful title='Home counter. Try me!'/>        
        </header>
    </div>
}

export default Home;
