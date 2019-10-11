const express = require('express')

const path = require('path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req,res,next)=>{
    console.log('shop.js', adminData.products);
    //sendFile usa rutas ABSOLUTAS, para eso uso path y __dirname
    //__dirname contiene la ruta absoluta hasta el file en el que estamos actualmente
    //luego hay que concatenar rutas hasta llegar a donde se desea
    res.sendFile(path.join(__dirname,'..','views','shop.html'));
});

module.exports = router;