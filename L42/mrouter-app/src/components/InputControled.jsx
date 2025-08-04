import { useState } from 'react';

function InputControled (props) {
  const [currentText, setCurrentText] = useState('');

  const handleChange = (event) => {
    setCurrentText(event.target.value);
    console.log('currentText :' + currentText);
  };

  return (
    <form>
      <label>
        {props.inputLabel}
        <input type="text" value={currentText} onChange={handleChange} />
      </label>
    </form>
  );
}

export default InputControled;