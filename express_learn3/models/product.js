//const products = [];

const fs = require('fs');
const path = require('path');

module.exports = class Product{
    constructor(title){
        this.title = title;
    }

    save(){
        //products.push(this);
        //usando files para guardar la data
        
        const p = path.join(path.dirname(process.mainModule.filename),'data','products.json');
        fs.readFile(p,(err, fileContent)=>{
            let products = [];
            if(!err){
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err=>{
                console.log(err);
            });
        });
    }

    static fetchAll(){
        //return  products;
        const p = path.join(path.dirname(process.mainModule.filename),'data','products.json');

        //recorda QUE ESTE METODO SE EJECUTA ASINCRONAMENTE!!!!
        //por eso el que reciba el resultado de la lectura del archivo recibirá undefined!!
        fs.readFile(p, (err, fileContent)=>{
            if(err){
                return [];
            }
            return JSON.parse(fileContent);
        });
    }
}