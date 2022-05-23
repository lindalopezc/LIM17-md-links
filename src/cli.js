#!/usr/bin/env node

const {mdLinks} = require('./md-links.js');

const inputPath = process.argv[2];
const options = [process.argv[3], process.argv[4]];

if (inputPath){
    if(options.includes('--validate') && options.includes('--state')){
        mdLinks(inputPath, {validate:true, state: true})
        .then(resolve => console.log(resolve));
    }
    else if(options.includes('--validate')){
        mdLinks(inputPath, {validate:true, state: false})
        .then(resolve => console.log(resolve));
    }
    else if(options.includes('--state')){
        mdLinks(inputPath, {validate:false, state: true})
        .then(resolve => console.log(resolve));
    }
    else{
        mdLinks(inputPath, {validate:false, state: false})
        .then(resolve => console.log(resolve));
    }
}
else{
    console.log('Error: Debe ingresar una ruta. Vuelva a intentarlo')
}
