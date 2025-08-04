import '../App.css';
import InputControled from './InputControled';

function ContactUs (props) {

    return <div className="App">
        <header className="App-header"> 
        <p>
            Contacts with Us
        </p>
        <InputControled inputLabel='Enter your phone:'/>        
        </header>
    </div>
}

export default ContactUs;