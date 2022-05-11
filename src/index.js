// module.exports = () => {
//   // ...
// };
const fs = require('fs');
const path = require('path');

const checkPathAbsolute = (inputPath) => path.isAbsolute(inputPath);

const checkPathExists = (inputPath) => fs.existsSync(inputPath);

const convertToAbsolute = (inputPath) => path.resolve(inputPath);

const checkPathIsDirectory = (inputPath) => fs.statSync(inputPath).isDirectory();

const getExtension = (inputPath) => path.extname(inputPath);

module.exports = {
  checkPathAbsolute, checkPathExists, convertToAbsolute, checkPathIsDirectory, getExtension
}