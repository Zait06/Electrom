const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const path = require('path');

const port = 3030;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// Parse application/json
app.use(bodyParser.json());


// Motor de plantilla
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.use('/', require('./routes/route'));

app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404"
    })
})

app.listen(port , () => {
    console.log("Servidor escuchando en "+port);
})