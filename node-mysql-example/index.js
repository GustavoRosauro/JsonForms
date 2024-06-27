const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());

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

app.listen(port, '0.0.0.0', () => {
    console.log(`0.0.0.0 port ${port}`)
})
