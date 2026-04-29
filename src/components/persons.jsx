const Persons = ({ persons, filteredPersons, filterName, deletePerson }) => {
    return (
        <>
            <h2>Numbers</h2>
            {persons.map(person => <p key={person.id}>{person.id} - {person.name} : {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></p>)}

            <hr />
            <h2>Filter Numbers</h2>
            {filterName === ''
                ? <p>No filter applied</p>
                : filteredPersons.map(filterPerson => <p key={filterPerson.id}>{filterPerson.id} - {filterPerson.name} : {filterPerson.number}</p>)}
        </>
    )
}

export default Persons
