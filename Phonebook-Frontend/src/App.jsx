import { useState, useEffect } from 'react'
import axios from 'axios'
import services from './services/phonebookServices'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notif, setNotif] = useState(null)

  // Communicating with backend server from db.json
  // Used to get the backend dat
  useEffect(() => {
    console.log('effect')
    services
      .getAll()
      .then(initialData => {
        console.log('promise fulfilled')
        setPersons(initialData)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      services
        .remove(id)
        .then(() => {
          // Update the UI state by filtering out the deleted person
          setNotif({
            message: `${name} successfully deleted .`,
            type: 'success'
          })
          setTimeout(() => {
              setNotif(null)
            }, 3000
          )
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setNotif({
            message: `The contact '${name}' was already deleted from the server.`,
            type: 'error'
          })
          setTimeout
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>

      <h2>Phonebook</h2>
      <h3>Notif</h3>
      <Notification notif={notif}/>
      <div> .</div>
      <Filter  filter={filter} setFilter={setFilter}/>
      <div>debug: {newName}</div>


      <PersonForm 
        persons={persons} 
        setPersons={setPersons} 
        newName={newName} 
        setNewName={setNewName} 
        newNumber={newNumber} 
        setNewNumber={setNewNumber} 
        notif={notif}
        setNotif={setNotif}
      /> 

      <h2>Numbers</h2>

      <Persons persons={personsToShow} deletePerson={deletePerson} />

    </div>
  )
}

export default App