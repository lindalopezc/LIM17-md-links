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
} = require('./index');

const mdLinks = (path, options = { validate: false, stats: false }) => new Promise((resolve, reject) => {
  if (checkPathExists(path)) {
    let linksArray;
    if (checkPathIsDirectory(path)) {
      const directoryContent = readDirectory(path);
      if (directoryContent) {
        const filesArray = saveFiles(directoryContent);
        const mdFilesArray = filterMdFiles(filesArray);
        if (mdFilesArray.length > 0) {
          linksArray = getLinks(mdFilesArray);

          if (options.validate && options.stats) { // validate: true, stats: true
            getStatusLink(linksArray)
              .then((response) => {
                const uniqueLinks = [...new Set(response.map((element) => element.href))];
                const brokensLinks = response.filter((element) => element.ok === 'fail');
                resolve(`Total: ${response.length} \nUnique: ${uniqueLinks.length} \nBroken: ${brokensLinks.length}`);
              });
          } else if (options.validate && !options.stats) { // validate: true, stats: false
            getStatusLink(linksArray)
              .then((response) => resolve(response));
          } else if (!options.validate && options.stats) { // validate: false, stats: true
            getStatusLink(linksArray)
              .then((response) => {
                const uniqueLinks = [...new Set(response.map((element) => element.href))];
                resolve(`Total: ${response.length} \n Unique: ${uniqueLinks.length}`);
              });
          } else { // Validate: false, stats: false
            resolve(linksArray);
          }
        } else {
          reject(new Error('No se encontró ningun archivo Markdown'));
        }
      } else {
        reject(new Error('Este directorio está vacío'));
      }
    } else if (getExtension(path) === '.md') {
      linksArray = getLinks([path]);
      if (options.validate) { // validate:true, stats:false
        getStatusLink(linksArray).then((response) => resolve(response));
      } else { // validate:false
        resolve(linksArray);// Array de objetos
      }
    } else {
      reject(new Error('La ruta ingresada no contiene un archivo markdown(.md)'));
    }
  } else {
    reject(new Error('La ruta ingresada no existe. Ingrese nuevamente una ruta.'));
  }
});
module.exports = { mdLinks };
