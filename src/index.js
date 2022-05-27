/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const convertToAbsolute = (inputPath) => (path.isAbsolute(inputPath) ? inputPath : path.resolve(inputPath));

const checkPathExists = (inputPath) => fs.existsSync(convertToAbsolute(inputPath));

const checkPathIsDirectory = (inputPath) => fs.statSync(inputPath).isDirectory();

const getExtension = (inputPath) => path.extname(inputPath);

const readDirectory = (pathDirectory) => {
  let directoryContent = fs.readdirSync(pathDirectory);
  if (directoryContent.length > 0) {
    directoryContent = directoryContent.map((element) => path.join(pathDirectory, element));
  }
  return directoryContent;
};

const saveFiles = (directoryContent) => {
  let filesArray = directoryContent.filter((element) => !checkPathIsDirectory(element));
  const directoriesArray = directoryContent.filter((element) => checkPathIsDirectory(element));
  directoriesArray.forEach((directory) => {
    const contentOfDirectory = readDirectory(directory);
    if (contentOfDirectory) {
      filesArray = filesArray.concat(saveFiles(contentOfDirectory));
    }
  });
  return filesArray;
};

const filterMdFiles = (filesArray) => {
  const mdFilesArray = filesArray.filter((file) => getExtension(file) === '.md');
  return mdFilesArray;
};

const getLinks = (mdFilesArray) => {
  const regExp = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi;
  const regExpText = /\[(.*)\]/g;
  const regExpURL = /\(((?:\/|https?:\/\/).*)\)/g;
  let linksArray = [];
  if (mdFilesArray.length > 0) {
    mdFilesArray.forEach((mdFile) => {
      const mdFileContent = fs.readFileSync(mdFile, 'utf8');
      const arrayWithLinks = mdFileContent.match(regExp);
      if (arrayWithLinks) {
        const linksOfEachFile = arrayWithLinks.map((link) => {
          const linksResolve = link.match(regExpURL).join().slice(1, -1);
          const textResolve = link.match(regExpText).join().slice(1, -1).substring(0, 50);
          mdFile = `.${mdFile.substring(mdFile.indexOf('\\') > 0 ? mdFile.lastIndexOf('\\') : mdFile.lastIndexOf('/'))}`;
          return {
            href: linksResolve,
            text: textResolve.substring(0, 50),
            file: mdFile,
          };
        });
        linksArray = linksArray.concat(linksOfEachFile);
      }
    });
  }
  return linksArray;
};

const getStatusLink = (linksArray) => {
  const array = linksArray.map((element) => {
    const fetchPromise = fetch(element.href)
      .then((response) => {
        const msg = response.status >= 200 && response.status <= 299 ? 'ok' : 'fail';
        return {
          href: element.href,
          text: element.text,
          file: element.file,
          status: response.status,
          ok: msg,
        };
      })
      .catch(() => ({
        href: element.href,
        text: element.text,
        file: element.file,
        status: 'Failed request',
        ok: 'fail',
      }));
    return fetchPromise;
  });
  return Promise.all(array); // retorna un array con los resultados de cada promesa
};

const getStats = (linksArray, options) => {
  if (options.validate) { // validate: true, stats: true
    const uniqueLinks = [...new Set(linksArray.map((element) => element.href))];
    const brokensLinks = linksArray.filter((element) => element.ok === 'fail');
    return `Total: ${linksArray.length} \nUnique: ${uniqueLinks.length} \nBroken: ${brokensLinks.length}`;
  }
  // validate: false, stats: true
  const uniqueLinks = [...new Set(linksArray.map((element) => element.href))];
  return `Total: ${linksArray.length} \nUnique: ${uniqueLinks.length}`;
};

module.exports = {
  convertToAbsolute,
  checkPathExists,
  checkPathIsDirectory,
  getExtension,
  readDirectory,
  saveFiles,
  filterMdFiles,
  getLinks,
  getStatusLink,
  getStats,
};
