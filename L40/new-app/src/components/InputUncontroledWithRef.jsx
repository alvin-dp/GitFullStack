import { useRef } from 'react';

function InputUncontroledWithRef(props){

    const inputRef = useRef(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        const enteredName = inputRef.current.value;
        //console.log(`You entered: ${enteredName}`);
        alert(`Output with Ref: ${enteredName}`);
    };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {props.inputLabel}
        <input type="text" ref={inputRef} />
      </label>
      <button type="submit">{props.buttonLabel}</button>
    </form>
  );
}

export default InputUncontroledWithRef;