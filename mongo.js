

// if(process.argv.length < 3){
//     console.log('need password');
//     process.exit(1)
// }

// const password = process.argv[2]






const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})
if(process.argv[3] && process.argv[4]){
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`);
        mongoose.connection.close()
    })
}
else{
    Person.find({}).then(result => {
        console.log('Phonebook:');
        result.forEach(person => {
            console.log(person.name, person.number);
        })
        mongoose.connection.close()
    })
}