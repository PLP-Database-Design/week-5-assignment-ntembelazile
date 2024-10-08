//import our dependencies
const express = require("express")
const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv')

//configure environment variables
dotenv.config();

//create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// test the connection
db.connect((err) => {
    // if the connection fails
    if(err) {
        return console.log("Error connecting to the database: ", err)
    }
    // if the connection is successful
    console.log("Succesfully connected to MySQL: ", db.threadId)
})

// retrieve all patients
app.get('', (req, res) => {
    const getPatients = "SELECT * FROM patients"
    db.query(getPatients, (err, data) => {
        // if I have an error
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }

        // if there is no error
        res.status(200).send(data)
    })
})


//basic endpoint to say Hello World
app.get("", (req, res) => {
    res.send("Hello World, Azile is a developer")
})




//start and listen to the server
app.listen(3300, () => {
    console.log('server is running on port 3300...')
})