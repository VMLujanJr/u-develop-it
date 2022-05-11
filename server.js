/* CREATE A CONNECTION TO THE EXPRESS.JS SERVER TO HOST THE APPLICATION */
// ...import express
const express = require('express');
// ...add PORT designation
const PORT = process.env.PORT || 3001;
// ...add app expression
const app = express();

// ...express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ...lastly, create a GET test route
/* app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
}); */


// Default response for any other request (Not Found)
// ...add a route to handle user requests that aren't supported by the app
// ...this route overwrites any route below it... make sure its at the bottom
app.use((req, res) => {
    res.status(404).end();
});

// ...function that will start the Express.js server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});