const fs = require("fs");
const path = require('path');
const parser = require('xml2js');

class XML{
    constructor(){
        this.dir =  path.join(__dirname, "../database/productos.xml");
        this.code = "utf-8";
        this.json = {};
    }

    async init(){
        await fs.readFile(this.dir, this.code, async (err, data) => {
            if (err) console.log(err);
            await parser.parseString(data, (err, result) => {
                if(err) console.log(err);
                this.json = result;
            });
        });
    }

    async showProductos(){
        return this.json;
    }

    async addProducto(product){
        this.json.productos.producto.push(product);
        var builder = new parser.Builder();
        var xml = builder.buildObject(this.json);

        await fs.writeFile(this.dir, xml, function(err, data) {
        if (err) console.log(err);

            console.log("successfully written our update xml to file");
        });
    }
}

module.exports = XML;