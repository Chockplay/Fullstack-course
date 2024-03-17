const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}
const Part = (props) => {
  return(
    <p>{props.content.name} {props.content.exercises} </p>
  )
}
const Content = (props) => {
  return(
    <div>
      <Part content= {props.content[0]} />
      <Part content= {props.content[1]} />
      <Part content= {props.content[2]} />
    </div>
  )
}
const Total = (props) => {
  return(
    <p>Number of exercises {props.number[0].exercises+props.number[1].exercises+props.number[2].exercises}</p>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const content = [
    {name: 'Fundamentals of React', exercises: 10},
    {name: 'Using props to pass data', exercises: 7},
    {name: 'State of a component', exercises: 14}
  ]

  return (
    <div>
      <Header course={course}/>
      <Content content={content} />
      <Total number={content} />
    </div>
  )
}

export default App

