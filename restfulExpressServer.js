import dotenv from 'dotenv';
import pg from 'pg';
import express from 'express';
import fs from 'fs';
dotenv.config();
const app = express();
app.use(express.static('public'));
app.use(express.json());
const port = process.env.PORT || 8000;
const { Pool } = pg;
const pool = new Pool({connectionString: process.env.DATABASE_URL});
pool.connect();

app.get('/pets', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM pets');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving pets from database');
    }
  });


app.get('/pets/:petID', async (req, res) => {
        const petID = req.params.petID
        try {
        const result = await pool.query('SELECT * FROM pets WHERE id = $1', [petID]);
        if (result.rows.length === 0) {
            res.status(404).send(`Pet with ID ${petID} not found`);
          } else {
            res.json(result.rows);
          }
        } catch (error) {
        res.status(500).send('Error reading pets database');
        }
    }) 


app.post('/pets', async (req, res) => {
    let name = req.body.name;
    let age = req.body.age
    let kind = req.body.kind;
    try {
        await pool.query('INSERT INTO pets (name, age, kind) VALUES ($1, $2, $3)', [name, age, kind]);
        res.send('Pet added successfully');
    } catch (error) {
        res.status(400).send("Usage: node pets.js create AGE KIND NAME");
    }     
})
        
app.put('/pets/:petID', async (req, res)=> {
    const petID = req.params.petID
    let name = req.body.name;
    let age = req.body.age
    let kind = req.body.kind;
    try {
        await pool.query('UPDATE pets SET name=$1, age=$2, kind=$3 WHERE id=$4', [name, age, kind, petID]);
        res.send('Pet added successfully');
    } catch (error) {
        res.status(400).send("Wrong again!");
    }     
})
       
app.delete('/pets/:petID', async (req, res) => {
      const petID = req.params.petID;
    try {
        const result = await pool.query('DELETE FROM pets WHERE id = $1', [petID]);
        res.send('Pet deleted successfully');
    } catch (error) {
        res.status(500).send('Error reading pets database');
        }
    }) 
      

app.listen(port, (error)=>{
    if (error){
        console.error(error)
    } else {
        console.log(`Actively listening to port: ${port}`)
    }
}) 