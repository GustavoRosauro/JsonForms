const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 4000;

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

app.listen(port, () => {
    console.log(`port ${port}`)
})