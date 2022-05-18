#!/usr/bin/env node

const {mdLinks} = require('./md-links.js');

let inputPath = process.argv[2];
if (inputPath){
    console.log(mdLinks(inputPath));
}
else{
    console.log('Error: Debe ingresar una ruta. Vuelva a intentarlo')
}
