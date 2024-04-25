const Course = ({ course }) => 
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total sum={course.parts} />
    </div>
    
const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => 
    <p>
        <strong>
        Total of exercises: {sum.reduce((x,total) => x + total.exercises , 0)}
        </strong>
    </p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
    <Part key={part.id} part={part}></Part> )}   
  </>
export default Course