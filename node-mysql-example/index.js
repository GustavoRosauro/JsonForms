const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    database: 'JsonForms'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to the database');
});

app.get('/data', (req,res) =>{
    const sql = 'select * from schema_table';
    db.query(sql, (err, results) =>{
        if(err){
            return res.status(500).send(err);
        }
        const data = results.map(row => ({
            id: row.id,
            data: JSON.parse(row.data)
        }));

        res.json(data);
    })
})

app.get('/data/ui', (req,res)=>{
   const sql = 'select * from uischema_table';
   db.query(sql, (err, results) => {
       if(err){
	  return res.status(500).send(err);
       }
       const data = results.map(row => ({
	    id: row.id, 
	    data: JSON.parse(row.data)
       }));
       res.json(data);
   })
})

app.get('/data/info', (req,res)=>{
    const sql = 'select * from initial_date';
    db.query(sql, (err, results) => {
        if(err){
       return res.status(500).send(err);
        }
        const data = results.map(row => ({
         id: row.id, 
         data: JSON.parse(row.data)
        }));
        res.json(data);
    })
 })

app.put('/data/:id', (req,res) =>{
    const id = req.params.id;
    const newData = req.body.data;

    if(!newData){
        return res.status(400).send({error: 'No data Provided'});
    }

    const sql = 'UPDATE initial_date set data = ? where id = ?';

    db.query(sql, [JSON.stringify(newData), id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: 'Item not found' });
        }
        res.send({ message: 'Item updated successfully' });
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`0.0.0.0 port ${port}`)
})
