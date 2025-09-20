const express = require('express');
const app = express();
app.use(express.json());

const DATA_BASE = [];

app.get('/', (req, res) => {
    console.log('Get database');
    res.json(DATA_BASE);
});

app.post('/', (req, res) => {
    const {name, age} = req.body;
    if(name && age) {
        DATA_BASE.push({name: name, age: age});
        console.log(`Add element to database: name: ${name}, age: ${age}`);
        return res.sendStatus(201);
    }
    res.sendStatus(400);
});

app.put('/:index', (req, res) => {
    const index = req.params.index;
    if(!DATA_BASE[index]) return res.sendStatus(304);

    const currentElement = DATA_BASE[index];
    const {name, age} = req.body;

    if(!name && !age) return res.sendStatus(304);
    if(name) DATA_BASE[index]['name'] = name;
    if(age) DATA_BASE[index]['age'] = age;
    console.log(`Element: name: ${currentElement.name}, age: ${age} \n` +
                `with index ${index} changed to: \n` + 
                `name: ` + (name? name : currentElement.name) + ', age:' + (age? age : currentElement.age )); 
    res.sendStatus(200)
});

app.delete('/:index', (req, res) => {
    const index = req.params.index;
    if(!DATA_BASE[index]) return res.sendStatus(304);
    const currentElement = DATA_BASE[index];
    DATA_BASE.splice(index, 1);
    console.log(`Element: name: ${currentElement.name}, age: ${currentElement.age} with index ${index} deleted`);
    res.sendStatus(200);
});

app.listen(3000, ()=>{
    console.log(`Server started... \n` +
                `Port: 3000`);
});