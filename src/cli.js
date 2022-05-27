#!/usr/bin/env node
/* eslint-disable no-dupe-else-if */
/* eslint-disable no-console */

const { mdLinks } = require('./md-links');

const inputsArray = process.argv;
const inputPath = inputsArray[2];
const options = [inputsArray[3], inputsArray[4]];

if (inputPath) {
  if (inputsArray.length === 3) {
    mdLinks(inputPath, { validate: false, stats: false })
      .then((resolve) => console.log(resolve))
      .catch((error) => console.log(error));
  } else if (inputsArray.length === 4) {
    if (options.includes('--validate')) {
      mdLinks(inputPath, { validate: true, stats: false })
        .then((resolve) => console.log(resolve))
        .catch((error) => console.log(error));
    } else if (options.includes('--stats')) {
      mdLinks(inputPath, { validate: false, stats: true })
        .then((resolve) => console.log(resolve))
        .catch((error) => console.log(error));
    } else {
      console.log('La opción ingresada no es válida. Opciones permitidas: --validate o --stats');
    }
  } else if (inputsArray.length === 5 && options.includes('--validate') && options.includes('--stats')) {
    mdLinks(inputPath, { validate: true, stats: true })
      .then((resolve) => console.log(resolve))
      .catch((error) => console.log(error));
  } else {
    console.log('Hay opciones ingresadas no válidas. Opciones permitidas: --validate o --stats');
  }
} else {
  console.log('Error: Debe ingresar una ruta. Vuelva a intentarlo');
}
