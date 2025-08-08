import '../App.css';
import InputControled from './InputControled';
import {useContext} from 'react';
import { UserContext } from '../context/UserContext';

function ContactUs (props) {
    const user = useContext(UserContext);
    const fullnane  = user.name + " " + user.vorname;
    return <div className="App">
        <header className="App-header"> 
        <p>
            Contacts with {user.role} {fullnane}:
        </p>
        <InputControled inputLabel='Enter your phone:'/>        
        </header>
    </div>
}

export default ContactUs;