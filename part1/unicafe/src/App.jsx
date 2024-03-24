import { useState } from 'react'
const Button = (props) => {
  return(
    <button onClick={props.handleClick} >
      {props.text}
    </button>
  )
}
const StatisticLine = (props) => {

  return(
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  )
}
const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = (props.good + (props.bad * -1))/total
  const positive = ((props.good)/total)*100

  if (total === 0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
      <table>
        <StatisticLine text = "Good" value={props.good} />
        <StatisticLine text = "Neutral" value={props.neutral} />
        <StatisticLine text = "Bad" value={props.bad} />
        <StatisticLine text = "all" value={total} />
        <StatisticLine text = "average" value={average} />
        <StatisticLine text = "positive" value={positive} />
      </table>
      
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={'Good'} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={'Neutral'} />
      <Button handleClick={() => setBad(bad + 1)} text={'Bad'} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App