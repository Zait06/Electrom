const express = require('express');
const router = express.Router();
const XML = require('../models/XML');

var xml = new XML();
xml.init();

router.get('/', (req, res) => {
    res.render("index");
});

router.get('/productos', async (req, res) => {
    let resp = await xml.showProductos();
    res.render("productos",{productos: resp.productos.producto});
})

router.get('/registrar', async (req, res) => {
    res.render("agregar");
})

router.post('/registrar', async (req, res) => {
    const body = req.body;
    // console.log(body);
    await xml.addProducto(body);
    res.redirect("/productos");
});

module.exports = router;