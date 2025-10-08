


export default function Dice(props){
const styles = {
    backgroundColor: "rgb(125, 3, 3)"
}

    return(
        <button 
        style={props.isHeld ? styles : null}
        onClick={() => props.hold(props.id)}
        aria-pressed ={props.isHeld}
        aria-label={`Die with value ${props.value},
         ${props.isHeld? "held" : "not held"}`}
         >
            {props.value}
        </button>
    )
}

