import { useState,useContext } from 'react';
import { UserContext } from '../context/UserContext';

function InputControled (props) {
  const [currentText, setCurrentText] = useState('');

  const handleChange = (event) => {
    setCurrentText(event.target.value);
    console.log('currentText :' + currentText);
  };
  const user = useContext(UserContext);
  return (
    <form>
      <label>
        User context: role - {user.role}, Name - {user.name}; {props.inputLabel}
        <input type="text" value={currentText} onChange={handleChange} />
      </label>
    </form>
  );
}

export default InputControled;