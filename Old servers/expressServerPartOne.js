import dotenv from 'dotenv';
import postgres from 'postgres';
import express from 'express';
import fs from 'fs';
const app = express();
app.use(express.static('public'));
app.use(express.json());
const port = process.env.PORT || 8000;


fs.readFile('pets.json', 'utf-8', (error, data) => {
    let pets = JSON.parse(data);

app.get('/pets', (req, res) => {  
    if (error) {
            res.status(500).send('Error reading pets.json');
        } else {
            res.json(pets);
        }  
      }) 


app.get('/pets/:petID', (req, res) => {
        const petID = req.params.petID
        if (error) {
            res.status(500).send('Error reading pets.json');
        } else if (petID >= pets.length || petID < 0){
                res.status(404).send("Not found");
        } else {
             res.json(pets[petID])    
        }
        })

app.post('/pets', (req, res) => {
        console.log(req.body);
        let name = req.body.name;
        let age = req.body.age
        let kind = req.body.kind;
        var newPet = {"name": name, "age": age, "kind": kind};
          
        if (name && age && kind){
            pets.push(newPet)
            fs.writeFileSync('pets.json', JSON.stringify(pets))
            res.send('Pet added successfully');
        } else {
            res.status(400).send("Usage: node pets.js create AGE KIND NAME");
        }
    })
        
app.put('/pets/:petID', (req, res)=> {
    console.log(req.body)
        let index = req.params.petID    
        let name = req.body.name;
        let age = req.body.age;
        let kind = req.body.kind;
        var newPet = {"age": age, "kind": kind, "name": name};       
            
    if (age && kind && name){
        pets[index] = newPet;              
        fs.writeFile('pets.json', JSON.stringify(pets), function(error){
            if(error){
                console.log(error)
            } else {
                res.send(pets[index])
            }
            })
        }
    })
       
app.delete('/pets/:petID', (req, res) => {
      const petID = req.params.petID;
      if (petID >= pets.length || petID < 0) {
        res.status(404).send('Not found');
      } else {
        pets.splice(petID, 1);
        fs.writeFileSync('pets.json', JSON.stringify(pets));
        res.send('Pet deleted successfully');
      }
    })
})

app.listen(port, (error)=>{
    if (error){
        console.error(error)
    } else {
        console.log(`Actively listening to port: ${port}`)
    }
}) 