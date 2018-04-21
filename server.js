'use strict';

// Application dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');

// Application Setup
const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Application Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

// API Endpoints
app.get('/api/v1/books', (req, res) => {
  client.query(`SELECT book_id, title, author, image_url, isbn FROM books;`)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.get('/api/v1/books/:id', (req,res) => {
//    console.log("test");
//    res.send("Hello");
    client.query(`
    select * from books where book_id = ${req.params.id};
    `)
    .then(results => res.send(results.rows))
    .catch(console.error);
});
// app.put('api/v1/books/:id'), (req,res) => {
//     console.log(req);
//     client.query(`
//     update books Set name = '${req.body.name}' where id = ${req.params.id};
//     `)
//     .then(results => res.send(results.rows))
//     .catch(console.error);
// }
// app.delete('api/v1/books/:id'), (req,res) => {
//     console.log(req);
//     client.query(`
//     delete from books where id = ${req.params.id}; 
//     `)
//     .then(results => res.sendStatus(200))
//     .catch(console.error);//http DELETE :3000/api/v1/books/:id test
// }
//app.get('*', (req, res) => res.redirect(CLIENT_URL));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));