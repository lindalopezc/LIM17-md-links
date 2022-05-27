/* eslint-disable jest/no-conditional-expect */
/* eslint-disable arrow-body-style */
/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable max-len */

jest.mock('node-fetch', () => jest.fn());
const fetch = require('node-fetch');

const { mdLinks } = require('../../src/md-links');

const pathTest1 = 'sample';
const pathTest2 = 'sample/sample2';
const pathTest3 = 'sample/sample2/mdfile2.md';
const pathTest4 = 'sample/sample2/empty.md';
const pathTest5 = 'sample/sample3';
const pathTest6 = 'sample/sample3/text.txt';
const emptyDirectory = 'sample/sample2/empty';

describe('mdLinks', () => {
  const response1 = {
    status: 200,
    ok: 'ok',
  };

  it('Debería retornar las estadisticas Total, Unique y Broken de los links encontrados', () => {
    fetch.mockImplementation(() => Promise.resolve(response1));
    return mdLinks(pathTest1, { validate: true, stats: true }).then((result) => {
      expect(result).toBe('Total: 8 \nUnique: 8 \nBroken: 0');
    });
  });

  it('Debería retornar las estadisticas Total y Unique de los links encontrados', () => {
    fetch.mockImplementation(() => Promise.resolve(response1));
    return mdLinks(pathTest2, { validate: false, stats: true })
      .then((result) => {
        expect(result).toBe('Total: 3 \nUnique: 3');
      });
  });
  it('Debería retornar 1 link roto', () => {
    return mdLinks(pathTest3, { validate: false, stats: false })
      .then((result) => {
        expect(result[2].text).toBe('Broken');
      });
  });
  it('Debería retornar Total:3 y Unique:3', () => {
    fetch.mockImplementation(() => Promise.resolve(response1));
    return mdLinks(pathTest3, { validate: false, stats: true })
      .then((result) => {
        expect(result).toBe('Total: 3 \nUnique: 3');
      });
  });
  it('Debería retornar mensaje de error: No se encontró ningún link.', () => {
    return mdLinks(pathTest4, { validate: false, stats: true })
      .catch((err) => {
        expect(err).toBe('No se encontró ningún link.');
      });
  });
  it('Debería retornar mensaje de error: La ruta ingresada no existe. Ingrese nuevamente una ruta.', () => {
    return mdLinks('cli.ruta', { validate: false, stats: true })
      .catch((err) => {
        expect(err).toBe('La ruta ingresada no existe. Ingrese nuevamente una ruta.');
      });
  });
  it('Debería retornar mensaje de error: No se encontró ningun archivo Markdown.', () => {
    return mdLinks(pathTest5, { validate: false, stats: true })
      .catch((err) => {
        expect(err).toBe('No se encontró ningun archivo Markdown(.md)');
      });
  });
  it('Debería retornar mensaje de error: Este directorio se encuentra vacío.', () => {
    return mdLinks(emptyDirectory, { validate: false, stats: true })
      .catch((err) => {
        expect(err).toBe('Este directorio se encuentra vacío.');
      });
  });
  it('Debería retornar mensaje de error: La ruta ingresada no contiene un archivo markdown(.md)', () => {
    return mdLinks(pathTest6, { validate: false, stats: true })
      .catch((err) => {
        expect(err).toBe('La ruta ingresada no contiene un archivo Markdown(.md)');
      });
  });
});
