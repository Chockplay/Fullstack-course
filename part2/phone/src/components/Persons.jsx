const Persons = ({filteredPersons,handleDeletePerson}) => 
 <div>
     {filteredPersons.map(person =><li key={person.name}>{person.name} {person.number} 
     <button onClick={() => handleDeletePerson(person.name,person.id)} >Delete</button></li>)}     
 </div>
    
export default Persons