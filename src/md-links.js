const {
    checkPathExists, 
    convertToAbsolute, 
    checkPathIsDirectory, 
    getExtension, 
    openDirectory,
    saveFiles,
  } = require('./index.js');

  const mdLinks = (path) => {
    const absolutePath = convertToAbsolute(path);
    if(checkPathExists(absolutePath)){
      if(checkPathIsDirectory(absolutePath)){
        const arrayChildrens = openDirectory(absolutePath);
        return arrayChildrens ? saveFiles(arrayChildrens, absolutePath).filter((file) => getExtension(file) ==='.md') : 'Este directorio está vacío';
      } 
      else{
       return getExtension(absolutePath) === '.md' ? 'Es un archivo markdown':'No es archivo markdown';
      }
    }
    else{
      return 'La ruta ingresada no existe';
    }
  }

  module.exports = {mdLinks}; 