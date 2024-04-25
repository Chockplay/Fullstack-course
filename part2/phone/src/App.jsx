import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import './index.css'

const Title = ({text}) => <h1>{text}</h1>
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(null)
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
  }
  ,[])
  const Notification = ({message}) => {
    if(message === null) {
      return null
    }
    else if(isError===true){
      return (
        <div className='error'>
          {message}
        </div>
      )
    }
    else{
      return (
        <div className='success'>
          {message}
        </div>
      )
    }
    
  }

  const newMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
    setErrorMessage(null)
      },5000)
  }
  const addPerson = (event) => {
    event.preventDefault()
    const duplicatedPerson = persons.filter(person => person.name.toLowerCase().includes(newName.toLowerCase()))
    if(duplicatedPerson.length > 0){
      if(newNumber.length > 0){
        if(window.confirm(`${newName} is alredy added to phonebook, replace the old number with a new one?`)){
          const personObject = {
            name: newName,
            number: newNumber
            }
          const id = duplicatedPerson[0].id
          personsService
            .update(id, personObject)
            .then(returnedPerson => {
               const newPerson = (persons.map(person => person.id !== id ? person : returnedPerson))
               setPersons(newPerson)
               setFilteredPersons(newPerson)
               setIsError(false)
               newMessage(`Updated ${newName}`)
            })
            .catch(error => {
              setIsError(true)
              newMessage(`Information of ${newName} has already been removed from server`)
            })
        }
      }
      else{
        alert(`${newName} is already added to phonebook`)
        setNewName('')      
        setNewNumber('')
      }
    }   
    else{
      const personObject = {
        name: newName,
        number: newNumber
        }
        personsService
          .create(personObject)
          .then(initialPersons => {
            const newPersons = persons.concat(initialPersons)
            setPersons(newPersons)
            setNewName('')
            setFilteredPersons(newPersons)
            setNewNumber('')
            newMessage(`Added ${newName}`)
            setIsError(false)
          })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handlefilteredChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())))
  }
  const handleDeletePerson = (name,id) => {
    if(window.confirm(`Delete ${name}?`)){
      personsService
        .deleteRequest(id)
        .then(() => {
          personsService
          .getAll()
          .then(updatePersons => {
          setPersons(updatePersons)
          setFilteredPersons(updatePersons)
          })
        })
      }
  }
  
  return (
    <div>
      <Title text={'Phonebook'} ></Title>
      <Notification message={errorMessage} isError={isError}></Notification>
      <Filter value={filter} onChange={handlefilteredChange}></Filter>
      <Title text={'Add new one'}></Title>
      <PersonForm addPerson={addPerson} name={newName} handleNameChange={handleNameChange} 
        number={newNumber} handleNumberChange={handleNumberChange} ></PersonForm>
      <Title text={'Numbers'}></Title>
      <Persons filteredPersons={filteredPersons} handleDeletePerson={handleDeletePerson} ></Persons>
    </div>
  )
}

export default App
