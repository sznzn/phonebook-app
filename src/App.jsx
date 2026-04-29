import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'
import './App.css'
import Notification from './components/notification'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState({message: null, type: null})
  useEffect(() => {
      personService.getAll().then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  )
  const addName = (event) => {
    event.preventDefault()
    
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (existingPerson) {
      if(window.confirm(`${newName} already exists, do you want to replace it`)){
      
      personService.update(existingPerson.id, nameObject).then(returnedPerson => {
        setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      setNotification({message:`Updated ${newName}`, type: 'success'})
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 5000)

    }
  }else{
    personService.create(nameObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
     
    setNotification({message: `Create ${newName}`, type: 'success'})
    setTimeout(() => {
      setNotification({message: null, type: null})
    }, 5000)
    })
    .catch(error =>{
      setNotification({message: error.response.data.error, type: 'error'})
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 5000)
    })
    
  }
}
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if(window.confirm("Are you sure you want to delete this person? " + person.name)){
      personService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setNotification({message: `Information of ${person.name} has already been removed from server`, type: 'error'})
        setTimeout(() => {
          setNotification({message: null, type: null})
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }
  return (
    <>
      <h2>Phonebook</h2>
      <Notification info={notification} />
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />

      <h2>Add a new one</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <Persons
        persons={persons}
        filteredPersons={filteredPersons}
        filterName={filterName}
        deletePerson={deletePerson}
      />


    </>
  )
}

export default App
