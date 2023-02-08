const express = require('express')
const mysql = require('mysql2');
const cors = require('cors');

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

//connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'sam',
    password: 'Sam123#@!',
    database: 'jwt_app'
  });
  
  connection.connect(err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('MySQL Connected...');
  });

  app.post('/users', (req, res) => {
    const { username, email, password } = req.body;
    const sql = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
    connection.query(sql, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Error inserting data into the database' });
        return;
      }
      res.json({ message: 'Data inserted successfully' });
    });
  });  

app.get('/login', (req, res) => {
res.json({"message": "success"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})