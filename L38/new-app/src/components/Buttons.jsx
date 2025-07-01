


function ButtonYellow(props){
  const buttonOnClick = () =>{
  {console.log(`Clicked ${props.name}`)  
      props.onClick()}
  }
  return <button style={{backgroundColor:'yellow'}}
    onClick={buttonOnClick}> I am {props.name} button   
  </button>
}

function ButtonRed(props){
  return <button style={{backgroundColor:'red'}}        
    onClick={()=>{console.log(`Clicked ${props.name}`) 
    props.onClick()}}>I am {props.name} button
    </button>
}

export {ButtonYellow,ButtonRed}