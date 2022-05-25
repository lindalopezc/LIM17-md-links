/* eslint-env jest */
const { mdLinks } = require('../../src/md-links');

const pathTest1 = 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample';
const pathTest2 = 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2';
const pathTest3 = 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\mdfile.md';
const pathTest4 = 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2\\mdfile2.md';
const pathTest5 = 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2\\empty.md';
const pathTest6 = 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample3';
const pathTest7 = 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample3\\text.txt';
const emptyDirectory = 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2\\empty';
const arrayLinks = [
  {
    file: 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\mdfile.md',
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise',
    text: 'Link 1',
  },
  {
    file: 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\mdfile.md',
    href: 'https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/',
    text: 'Link 2',
  },
  {
    file: 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\mdfile.md',
    href: 'https://jestjs.io/docs/es-ES/getting-started',
    text: 'Link 3',
  },
  {
    file: 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\mdfile.md',
    href: 'https://jestjs.io/docs/es-ES/asynchronous',
    text: 'Link 4',
  },
  {
    file: 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\mdfile.md',
    href: 'https://jestjs.io/docs/es-ES/manual-mocks',
    text: 'Link 5',
  }];
const arrayStats = [
  {
    href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
    text: 'Link prueba 1',
    file: 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2\\mdfile2.md',
    status: 200,
    ok: 'ok',
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Messages',
    text: 'Link prueba 2',
    file: 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2\\mdfile2.md',
    status: 200,
    ok: 'ok',
  },
  {
    href: 'http://community.laboratoria.la/c/js',
    text: 'Broken',
    file: 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2\\mdfile2.md',
    status: 'Failed request',
    ok: 'fail',
  },
];

describe('mdLinks', () => {
  it('Debería retornar las estadisticas Total, Unique y Broken de los links encontrados', () => {
    expect(mdLinks(pathTest1, { validate: true, stats: true })).resolves.toEqual('Total: 8 \nUnique: 8 \nBroken: 1');
  });
  it('Debería retornar las estadisticas Total y Unique de los links encontrados', () => {
    expect(mdLinks(pathTest2, { validate: false, stats: true })).resolves.toEqual('Total: 3 \nUnique: 3');
  });
  it('Debería retornar un array de objetos por link con href, text y file', () => {
    expect(mdLinks(pathTest3, { validate: false, stats: false })).resolves.toEqual(arrayLinks);
  });
  it('Debería retornar un array de objetos por link con href, text, file, status y ok', () => {
    expect(mdLinks(pathTest4, { validate: true, stats: false })).resolves.toEqual(arrayStats);
  });
  it('Debería retornar Total:3 y Unique:3', () => {
    expect(mdLinks(pathTest4, { validate: false, stats: true })).resolves.toEqual('Total: 3 \nUnique: 3');
  });
  it('Debería retornar mensaje de error', () => {
    expect(mdLinks(pathTest5, { validate: false, stats: true })).rejects.toEqual('No se encontró ningún link.');
  });
  it('Debería retornar mensaje de error: La ruta ingresada no existe. Ingrese nuevamente una ruta.', () => {
    expect(mdLinks('cli.ruta', { validate: false, stats: true })).rejects.toEqual('La ruta ingresada no existe. Ingrese nuevamente una ruta.');
  });
  it('Debería retornar mensaje de error: No se encontró ningun archivo Markdown. ', () => {
    expect(mdLinks(pathTest6, { validate: false, stats: true })).rejects.toEqual('No se encontró ningun archivo Markdown.');
  });
  it('Debería retornar mensaje de error: Este directorio se encuentra vacío. ', () => {
    expect(mdLinks(emptyDirectory, { validate: false, stats: true })).rejects.toEqual('Este directorio se encuentra vacío.');
  });
  it('Debería retornar mensaje de error: La ruta ingresada no contiene un archivo markdown(.md) ', () => {
    expect(mdLinks(pathTest7, { validate: false, stats: true })).rejects.toEqual('La ruta ingresada no contiene un archivo markdown(.md)');
  });
});
