const {
  checkPathExists,
  convertToAbsolute, 
  checkPathIsDirectory, 
  getExtension, 
  readDirectory, 
  saveFiles, 
  filterMdFiles
} = require('./index.js');

const mdLinks = (path) => {
  if(checkPathExists(path)){
    if(checkPathIsDirectory(path)){
      const directoryContent = readDirectory(path);
      if(directoryContent){
        const filesArray = saveFiles(directoryContent);
        return filterMdFiles(filesArray);
      }
      else {
        return 'Este directorio está vacío';
      }
    } 
    else{
     return getExtension(path) === '.md' ? 'Es un archivo markdown, voy a buscar links':'No es archivo markdown';
    }
  }
  else{
    return 'La ruta ingresada no existe';
  }
}
  module.exports = {mdLinks}; 