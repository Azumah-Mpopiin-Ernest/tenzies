import { useState, useRef, useEffect } from "react";
import Dice from "./Dice";
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import {useWindowSize} from "react-use"


export default function App(){

const [gameStarted, setGameStarted] = useState(false)

  function generateAllDice(){

    const newDice =[]

    for(let i = 0; i<10; i++){

      const Dice = {
        value: (Math.floor(Math.random() * 6) +1),
        isHeld: false,
        id: nanoid()
      }
      newDice.push(Dice)
    }
    
    return newDice
    
  }

const [dice, setDice] = useState( () => generateAllDice())

const [time, setTime] = useState(0)
const [isRunning, setIsRunning] = useState(true)


useEffect(() => {
  let interVal

  if(isRunning){
    interVal =
    setInterval(() => {
      setTime(prevTime => prevTime + 1)}, 1000
    )
  }


  return () => clearInterval(interVal)
}, [isRunning])



const eachDice = dice.map(die => (
  <Dice 
  value={die.value}
  isHeld={die.isHeld}
  key={die.id}
  id={die.id}
  hold={Hold}
  />
))

const gameWon = (dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value))

useEffect(() => {
     if(gameWon){
    setIsRunning(false)
  }
  },[gameWon])

function rollDice(){
  if(gameWon){
    setDice(generateAllDice)
    setIsRunning(true)
    setTime(0)
  }

  else{
    setDice(prevDice => prevDice.map(die => (
      die.isHeld ? die : {...die, value: (Math.floor(Math.random() * 6) +1)}
    )))
  }
  
}

function Hold(id){

  setDice(dice => dice.map(
    object => (
      object.id === id?  {...object, isHeld: !gameWon ? !object.isHeld : object.isHeld} : object
    )
  ))
}

const {width, height} = useWindowSize()


const newGameButtonRef = useRef(null)



useEffect(() => {

  if(gameWon && newGameButtonRef.current){
    newGameButtonRef.current.focus()
  }

}, [gameWon])








function startGame() {
  setGameStarted(true)
  setTime(0)
  setIsRunning(true)
}


  return (
  <main className="main-container">
    {!gameStarted ? (
      
        <div>
          <h2>Tenzies</h2>
          <p>Roll until all dice are the same.
            Click each die to freeze it at its current
            value between rolls.
          </p>
<button onClick={startGame} className="start-btn">Start Game</button>
        </div>
        
     
    ) : (
      <>
        <p className="timer" style={{color:"rgb(125, 3, 3)"}}>{time}</p>

        {gameWon && <Confetti width={width} height={height} />}
      {gameWon && <audio src="../Audio/win.mp3" autoPlay ></audio>}
        <div aria-live="polite" className="sr-only">
          {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
        </div>

        <div>
          <h2>Tenzies</h2>
          <p>Roll until all dice are the same.
            Click each die to freeze it at its current
            value between rolls.
          </p>
        </div>

        <section className="dice-container">
          {eachDice}
        </section>

        <button
          name="btn"
          ref={newGameButtonRef}
          onClick={rollDice}
          className={`roll-btn ${gameWon ? "pulse" : "roll-btn"}`}
        >
          {gameWon ? "New Game" : "Roll"}
        </button>
      </>
    )}
  </main>
)

}