#!/usr/bin/env node
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
/* eslint-disable no-dupe-else-if */
/* eslint-disable no-console */
const chalk = require('chalk');
const { mdLinks } = require('./md-links');

const error = chalk.bold.red;
const warning = chalk.bold.yellow;
const fileColor = chalk.white;
const urlColor = chalk.bold.magenta;
const textColor = chalk.bold.blue;
const okColor = chalk.bold.green;
const statusColor = chalk.bold.yellow;

const inputsArray = process.argv;
const inputPath = inputsArray[2];
const options = [inputsArray[3], inputsArray[4]];

if (inputPath) {
  if (inputsArray.length === 3) {
    mdLinks(inputPath, { validate: false, stats: false })
      .then((resolve) => resolve.forEach((element) => {
        return console.log(fileColor(element.file), urlColor(element.href), textColor(element.text));
      }))
      .catch((err) => console.log(warning(err)));
  } else if (inputsArray.length === 4) {
    if (options.includes('--validate')) {
      mdLinks(inputPath, { validate: true, stats: false })
        .then((resolve) => resolve.forEach((element) => {
          return console.log(fileColor(element.file), urlColor(element.href), okColor(element.ok), statusColor(element.status), textColor(element.text));
        }))
        .catch((err) => console.log(warning(err)));
    } else if (options.includes('--stats')) {
      mdLinks(inputPath, { validate: false, stats: true })
        .then((resolve) => console.log(textColor(resolve)))
        .catch((err) => console.log(warning(err)));
    } else {
      console.log(error('Error: La opción ingresada no es válida. Opciones permitidas: --validate o --stats'));
    }
  } else if (inputsArray.length === 5 && options.includes('--validate') && options.includes('--stats')) {
    mdLinks(inputPath, { validate: true, stats: true })
      .then((resolve) => console.log(textColor(resolve)))
      .catch((err) => console.log(warning(err)));
  } else {
    console.log(error('Error: Hay opciones ingresadas no válidas. Opciones permitidas: --validate o --stats'));
  }
} else {
  console.log(error('Error: Debe ingresar una ruta. Vuelva a intentarlo'));
}
