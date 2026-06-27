
/* From the App file, we innitialized the Persons with {persons, deletePerson} argument, the we put the parameter here*/
const Persons = ({persons, deletePerson}) => {

  return(
    <ul>
      {persons.map((person) => (
        <li key={person.id}>{person.name} {person.number}
          <button type="button" onClick={() => deletePerson(person.id, person.name)}>Delete</button>
        </li> 
      ))}
    </ul>
  )
}

export default Persons;