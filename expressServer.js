const express = require('express');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;

fs.readFile('pets.json', 'utf-8',(error, data)=> {
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
    })

app.listen(port, () => {
  console.log(`server is listening to: ${port}`)
})