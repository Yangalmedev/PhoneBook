/* The logic is giving */

const Filter = ({personsToShow, filter, setFilter}) => {

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  return(
    <div>
      Filter: <input onChange={handleFilterChange} value={filter}/>
    </div>
  )
}

export default Filter;