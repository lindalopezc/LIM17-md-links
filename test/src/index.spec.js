/* eslint-disable no-console */
/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable max-len */
jest.mock('node-fetch', () => jest.fn());
const fetch = require('node-fetch');
const {
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
} = require('../../src/index');

describe('convertToAbsolute', () => {
  const pathTest1 = 'sample\\sample3';
  const pathTest2 = 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample3';

  it('Debería convertir una ruta relativa en absoluta', () => {
    expect(convertToAbsolute(pathTest1)).toBe(pathTest2);
  });
});

describe('checkPathExists', () => {
  const pathTest1 = 'sample\\sample2';
  const pathTest2 = 'src\\hi.js';

  it('Debería retornar true si la ruta existe', () => {
    expect(checkPathExists(pathTest1)).toBe(true);
  });
  it('Debería retornar false si la ruta no existe', () => {
    expect(checkPathExists(pathTest2)).toBe(false);
  });
});

describe('checkPathIsDirectory', () => {
  const pathTest1 = 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample3';
  const pathTest2 = 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\src\\index.js';

  it('Debería retornar true si la ruta es un directorio', () => {
    expect(checkPathIsDirectory(pathTest1)).toBe(true);
  });
  it('Debería retornar false si la ruta no es un directorio', () => {
    expect(checkPathIsDirectory(pathTest2)).toBe(false);
  });
});

describe('getExtension', () => {
  const pathTest1 = 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\img\\MD-Links Linda López.jpg';
  const pathTest2 = 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\src\\index.js';

  it('Debería retornar .jpg', () => {
    expect(getExtension(pathTest1)).toBe('.jpg');
  });
  it('Debería retornar .js', () => {
    expect(getExtension(pathTest2)).toBe('.js');
  });
});

describe('readDirectory', () => {
  const pathTest1 = 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample';
  const arrayTest1 = [
    'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\mdfile.md',
    'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2',
    'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample3',
    'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\text.txt',
  ];

  it('Debería retornar un array con 4 elementos', () => {
    expect(readDirectory(pathTest1)).toEqual(arrayTest1);
  });
});

describe('saveFiles', () => {
  const arrayTest1 = [
    'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2',
    'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample3',
    'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\mdfile.md',
    'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\text.txt',
  ];

  it('Debería retornar un array con 5 archivos', () => {
    expect(saveFiles(arrayTest1).length).toBe(5);
  });
});

describe('filterMdFiles', () => {
  const arrayTest1 = [
    'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2',
    'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample3',
    'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\mdfile.md',
    'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\text.txt',
  ];

  it('Debería retornar 4 archivos de tipo Markdown', () => {
    expect(filterMdFiles(arrayTest1).length).toBe(1);
  });
  it('Debería retornar un array vacío', () => {
    expect(filterMdFiles([])).toEqual([]);
  });
});

describe('getLinks', () => {
  const linksArrayTest = [
    {
      file: 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2\\mdfile2.md',
      href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
      text: 'Link prueba 1',
    },
    {
      file: 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2\\mdfile2.md',
      href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Messages',
      text: 'Link prueba 2',
    },
    {
      file: 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2\\mdfile2.md',
      href: 'http://community.laboratoria.la/c/js',
      text: 'Broken',
    },
  ];

  it('Debería retornar un array con todos los links del archivo .md', () => {
    expect(getLinks(['C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2\\mdfile2.md'])).toEqual(linksArrayTest);
  });
  it('Debería retornar un array vacío cuando no hay links en el archivo .md', () => {
    expect(getLinks(['C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2\\empty.md'])).toEqual([]);
  });
});

describe('getStatusLink', () => {
  const arrayTest1 = [
    {
      href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
      text: 'Link prueba 1',
      file: 'C:/Users/chris/OneDrive/Escritorio/LIM17-md-links/sample/sample2/mdfile2.md',
      status: 200,
      ok: 'ok',
    },
  ];

  const arrayTest2 = [
    {
      href: 'http://community.laboratoria.la/c/js',
      text: 'Broken',
      file: 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2\\mdfile2.md',
      status: 'Failed request',
      ok: 'fail',
    },
  ];

  const response1 = {
    status: 200,
    ok: 'ok',
  };

  const response2 = {
    status: 'Failed request',
    ok: 'fail',
  };

  it('Debería retornar las propiedades href, text, file, status y ok de un link', () => {
    fetch.mockImplementation(() => Promise.resolve(response1));
    return getStatusLink(arrayTest1).then((data) => {
      expect(data).toEqual(arrayTest1);
    });
  });

  it('Debería fallar la petición del fetch y retornar status: Failed request', () => {
    fetch.mockImplementation(() => Promise.reject(response2));
    return getStatusLink(arrayTest2).then((data) => {
      expect(data).toEqual(arrayTest2);
    });
  });
});

describe('getStats', () => {
  const arrayTest = [{
    href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
    text: 'Link prueba 1',
    file: 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2\\mdfile2.md',
    status: 200,
    ok: 'ok',
  },
  {
    href: 'https://developer.mozilla.org/es/docs.hidje',
    text: 'Link prueba 2',
    file: 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2\\mdfile2.md',
    status: 400,
    ok: 'fail',
  }];
  const statsTest1 = 'Total: 2 \nUnique: 2 \nBroken: 1';
  const statsTest2 = 'Total: 2 \nUnique: 2';
  it('Debería retornar estadísticas Total, Unique y Broken', () => {
    expect(getStats(arrayTest, { validate: true, stats: true })).toBe(statsTest1);
  });
  it('Debería retornar estadísticas Total y Unique', () => {
    expect(getStats(arrayTest, { validate: false, stats: true })).toBe(statsTest2);
  });
});
