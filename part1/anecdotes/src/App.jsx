import { useState } from 'react'
const Button = (props) => {
  return (
      <>
        <button onClick={props.handleClick} >
          {props.text}
        </button>
      </>
  )
}
const Anecdote = (props) => {
  return(
    <>
      <h1>{props.text}</h1>
      <p className='anecdote' >{props.anecdotes}</p>
      <p>has {props.points} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [points, setPoints] = useState(Array(8).fill(0))
  const [selected, setSelected] = useState(0)
  const [mostVoted, setVoted] = useState(-1)
  const nextClick = () => {
    const random = Math.floor(Math.random()*anecdotes.length)
    setSelected(random)
  }
  
  const voteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    const higherPoint = Math.max(...copy)
    const higherVoted = copy.indexOf(higherPoint)
    setVoted(higherVoted)
  }
  const Winner = (props) => {
    if (props.mostVoted > -1)
      return(<Anecdote text={'Anecdote with most votes'} anecdotes={anecdotes[mostVoted]} points={points[mostVoted]}/>)
    
    
  }
  return (
    <div>
      <Anecdote text={'Anecdote of the day'} anecdotes={anecdotes[selected]} points={points[selected]}/>
      <Button handleClick={voteClick} text={'Vote'} ></Button>
      <Button handleClick={nextClick} text={'next anecdote'} ></Button>
      <Winner mostVoted={mostVoted} />
    </div>
  )
}
export default App
