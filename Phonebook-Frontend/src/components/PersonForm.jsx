import axios from 'axios'
import services from '../services/phonebookServices'

/* From the App file, we innitialized the PersonForm with 
{persons, setPersons, newName, setNewName, newNumber, setNewNumber} 
argument because we needed those in this file, then we put the parameters here  */
const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, notif, setNotif }) => {

  const addPerson = (event) => {
    event.preventDefault()

    const nameExist = persons.find(person => person.name.toLowerCase() === newName.trim().toLowerCase())

    if(nameExist){
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
    
      if(confirmUpdate){
        const updatePerson = { ...nameExist, number: newNumber}

        services
          .update(nameExist.id, updatePerson)
          .then(returnedPerson => {
            setNotif({
              message: `${updatePerson.name}'s number successfully updated`,
              type: 'succes'
            })
            setTimeout(() => {
              setNotif(null)
            }, 3000)
            setPersons(persons.map(
              person => person.id !== nameExist.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }
    
    const personObj = { name: newName , number: newNumber}
    // Using axios services (create()) to add new person 
    services
      .create(personObj)
      .then(returnedPerson => {
        setNotif({
          message: `${personObj.name} added successfully`,
          type: 'succes'
        })
        setTimeout(() => {
            setNotif(null)
          }, 3000
        )
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        console.log(returnedPerson)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return(
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <button type="submit">ADD</button>
    </form>
  )

}

export default PersonForm;