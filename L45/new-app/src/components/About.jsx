import '../App.css';
import CounterStateful from './CounterStateful';
import CounterStatefulRTK from './CounterStatefulRTK';
import {Outlet} from "react-router";


function About (props) {

    return <div className="App">
        <header className="App-header">
        <CounterStateful title='About default Redux counter. Try me!'/>        
        <CounterStatefulRTK title='About counter. Try me!'/>        
        <p>
            About page.
        </p>        
        <Outlet/>           
        </header>     
    </div>
}

export default About;