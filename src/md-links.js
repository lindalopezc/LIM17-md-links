/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable max-len */
const {
  checkPathExists,
  checkPathIsDirectory,
  getExtension,
  readDirectory,
  saveFiles,
  filterMdFiles,
  getLinks,
  getStatusLink,
  getStats,
} = require('./index');

const mdLinks = (path, options = { validate: false, stats: false }) => new Promise((resolve, reject) => {
  if (checkPathExists(path)) {
    let linksArray;
    if (checkPathIsDirectory(path)) {
      const directoryContent = readDirectory(path);
      if (directoryContent.length > 0) {
        const filesArray = saveFiles(directoryContent);
        const mdFilesArray = filterMdFiles(filesArray);
        if (mdFilesArray.length > 0) {
          linksArray = getLinks(mdFilesArray);
        } else {
          reject('No se encontró ningun archivo Markdown(.md)');
        }
      } else {
        reject('Este directorio se encuentra vacío.');
      }
    } else if (getExtension(path) === '.md') {
      linksArray = getLinks([path]);
    } else {
      reject('La ruta ingresada no contiene un archivo Markdown(.md)');
    }
    if (linksArray.length > 0) {
      if (options.validate && options.stats) { // validate: true, stats: true
        getStatusLink(linksArray)
          .then((response) => resolve(getStats(response, options)));
      } else if (options.validate && !options.stats) { // validate: true, stats: false
        getStatusLink(linksArray)
          .then((response) => resolve(response));
      } else if (!options.validate && options.stats) { // validate: false, stats: true
        getStatusLink(linksArray)
          .then((response) => resolve(getStats(response, options)));
      } else { // Validate: false, stats: false
        resolve(linksArray);
      }
    } else {
      reject('No se encontró ningún link.');
    }
  } else {
    reject('La ruta ingresada no existe. Ingrese nuevamente una ruta.');
  }
});

module.exports = { mdLinks };
