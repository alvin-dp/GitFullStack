import '../App.css';
import CounterStateful from './CounterStateful';
import CounterStatefulRTK from './CounterStatefulRTK';


function Home (props) {

    return <div className="App">
        <header className="App-header">

        <h2>Home page</h2>
        <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
        <CounterStateful title='Home default Redux counter. Try me!'/>     
        <CounterStatefulRTK title='Home counter. Try me!'/>        
        </header>
    </div>
}

export default Home;
