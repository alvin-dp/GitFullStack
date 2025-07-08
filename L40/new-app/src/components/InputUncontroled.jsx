function InputUncontroled(props){

    //const inputRef = useRef(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        const enteredName = event.target.elements.data.value;
        console.log(`You entered: ${enteredName}`);
        //alert('You entered text: ' + enteredName);
    };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {props.inputLabel}
        <input type="text" name="data" />
      </label>
      <button type="submit">{props.buttonLabel}</button>
    </form>
  );
}

export default InputUncontroled;