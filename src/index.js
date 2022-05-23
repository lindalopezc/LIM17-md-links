const fs = require('fs');
const path = require('path');

const convertToAbsolute = (inputPath) => path.isAbsolute(inputPath)? inputPath: path.resolve(inputPath);

const checkPathExists = (inputPath) => fs.existsSync(convertToAbsolute(inputPath));

const checkPathIsDirectory = (inputPath) => fs.statSync(inputPath).isDirectory();

const getExtension = (inputPath) => path.extname(inputPath);

const readDirectory = (pathDirectory) => {
   let directoryContent = fs.readdirSync(pathDirectory);
    if(directoryContent.length > 0){
        directoryContent = directoryContent.map((element) => element = path.join(pathDirectory, element));
        return directoryContent;
    }
}
const saveFiles = (directoryContent) => {
    let filesArray = directoryContent.filter((element) => !checkPathIsDirectory(element));
    let directoriesArray = directoryContent.filter((element) => checkPathIsDirectory(element));
    directoriesArray.forEach(directory => {
        let contentOfDirectory = readDirectory(directory);
        if(contentOfDirectory){
            filesArray = filesArray.concat(saveFiles(contentOfDirectory));
        }
    });
    return filesArray;
}
const filterMdFiles = (filesArray) => {
    const mdFilesArray =  filesArray.filter((file) => getExtension(file) ==='.md');
    return mdFilesArray;
}

const getLinks = (mdFilesArray) => {
    const regExp = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi;
    const regExpText = /\[(.*)\]/g;
    const regExpURL = /\(((?:\/|https?:\/\/).*)\)/g;
    let linksCharacteristicsArray = [];
    if(mdFilesArray.length>0){
        mdFilesArray.forEach((mdFile) => {
            const mdFileContent = fs.readFileSync(mdFile, 'utf8');
            const linksArray = mdFileContent.match(regExp); // return arrays
            if (linksArray) {
              const linksOfEachFile = linksArray.map((link) => {
                const linksResolve = link.match(regExpURL).join().slice(1, -1); // join links and remove parentheses
                const textResolve = link.match(regExpText).join().slice(1, -1); // remove the brackets
                link = {
                  href: linksResolve,
                  text: textResolve.substring(0, 50),
                  file: mdFile,
                }
                return link;
              });
              linksCharacteristicsArray = linksCharacteristicsArray.concat(linksOfEachFile);
            }
        })
        return linksCharacteristicsArray;
    }
}

module.exports = {
 convertToAbsolute, 
 checkPathExists,
 checkPathIsDirectory, 
 getExtension, 
 readDirectory, 
 saveFiles, 
 filterMdFiles, 
 getLinks
}