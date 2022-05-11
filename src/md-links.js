const {
    checkPathAbsolute, 
    checkPathExists, 
    convertToAbsolute, 
    checkPathIsDirectory, 
    getExtension
  } = require('./index.js');

  const mdLinks = (path) => {
    while (!checkPathAbsolute(path)){
          console.log('La ruta ingresada es relativa:', path);
          const path = convertToAbsolute(path);
          console.log('La ruta ha sido convertida en absoluta:', path);
      }
    return path;
  }
  module.exports = {mdLinks};