import dotenv from 'dotenv';
import pg from 'pg';
import express from 'express';

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
            res.send(result.rows);
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
        
app.patch('/pets/:petID', async (req, res)=> {
   const petID = req.params.petID
   const key = Object.keys(req.body)[0];
   const value = Object.values(req.body)[0];
    try {
        const result = await pool.query(`UPDATE pets SET ${key} = $1 WHERE id = $2`, [value, petID]);
        if (result.rowCount === 0) {
            res.status(404).send(`Pet with ID ${petID} not found`);
          } else {
            res.send(result.rows);
          }
        } catch (error) {
        res.status(500).send('Error reading pets database');
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