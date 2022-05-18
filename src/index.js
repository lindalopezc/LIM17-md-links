// module.exports = () => {
//   // ...
// };
const fs = require('fs');
const path = require('path');

const convertToAbsolute = (inputPath) => path.isAbsolute(inputPath)? inputPath: path.resolve(inputPath);

const checkPathExists = (inputPath) => fs.existsSync(inputPath);

const checkPathIsDirectory = (inputPath) => fs.statSync(inputPath).isDirectory();

const getExtension = (inputPath) => path.extname(inputPath);

const openDirectory = (pathDirectory) => {
    const arrayChildrens = fs.readdirSync(pathDirectory);
    if(arrayChildrens.length > 0){
        return arrayChildrens;
    }
}
const saveFiles = (arrayChildrens, inputPath) => {
    let array = arrayChildrens.map((element) => element = path.join(inputPath, element));
    let filesArray = array.filter((element) => !checkPathIsDirectory(element));
    let directoryArray = array.filter((element) => checkPathIsDirectory(element));
    directoryArray.forEach(directory => {
        let arrayGrandChild = openDirectory(directory);
        if(arrayGrandChild){
            filesArray = filesArray.concat(saveFiles(arrayGrandChild, directory));
        }
    });
    return filesArray;
}

module.exports = {
 checkPathExists, convertToAbsolute, checkPathIsDirectory, getExtension, openDirectory, saveFiles
}