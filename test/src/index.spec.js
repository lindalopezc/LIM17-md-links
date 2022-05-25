/* eslint-env jest */

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
  const pathTest1 = 'LIM017-social-network\\src';
  const pathTest2 = 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\LIM017-social-network\\src';

  it('Debería convertir una ruta relativa en absoluta', () => {
    expect(convertToAbsolute(pathTest1)).toBe(pathTest2);
  });
  it('Debería retornar una ruta absoluta', () => {
    expect(convertToAbsolute(pathTest2)).toBe(pathTest2);
  });
});

describe('checkPathExists', () => {
  const pathTest1 = 'C:\\Users\\chris\\Documents\\LIM017-social-network\\src\\templates';
  const pathTest2 = 'src\\hi.js';

  it('Debería retornar true si la ruta existe', () => {
    expect(checkPathExists(pathTest1)).toBe(true);
  });
  it('Debería retornar false si la ruta no existe', () => {
    expect(checkPathExists(pathTest2)).toBe(false);
  });
});

describe('checkPathIsDirectory', () => {
  const pathTest1 = 'C:\\Users\\chris\\Downloads\\CarpetaPrueba';
  const pathTest2 = 'C:\\Users\\chris\\Downloads\\user.png';

  it('Debería retornar true si la ruta es un directorio', () => {
    expect(checkPathIsDirectory(pathTest1)).toBe(true);
  });
  it('Debería retornar false si la ruta no es un directorio', () => {
    expect(checkPathIsDirectory(pathTest2)).toBe(false);
  });
});

describe('getExtension', () => {
  const pathTest1 = 'C:\\Users\\chris\\OneDrive\\Imágenes\\profile.png';
  const pathTest2 = 'C:\\Users\\chris\\OneDrive\\Imágenes\\INTELIGENCIA.pdf';

  it('Debería retornar .png', () => {
    expect(getExtension(pathTest1)).toBe('.png');
  });
  it('Debería retornar .pdf', () => {
    expect(getExtension(pathTest2)).toBe('.pdf');
  });
});

describe('readDirectory', () => {
  const pathTest1 = 'C:\\Users\\chris\\OneDrive\\Imágenes\\agosto2021';
  const arrayTest1 = ['C:\\Users\\chris\\OneDrive\\Imágenes\\agosto2021\\1.png',
    'C:\\Users\\chris\\OneDrive\\Imágenes\\agosto2021\\2.png',
    'C:\\Users\\chris\\OneDrive\\Imágenes\\agosto2021\\3.png',
    'C:\\Users\\chris\\OneDrive\\Imágenes\\agosto2021\\4.png',
    'C:\\Users\\chris\\OneDrive\\Imágenes\\agosto2021\\5.png'];

  it('Debería retornar un array con 4 elementos', () => {
    expect(readDirectory(pathTest1)).toEqual(arrayTest1);
  });
});

describe('saveFiles', () => {
  const arrayTest1 = ['C:\\Users\\chris\\Downloads\\CarpetaPrueba\\CarpetaHija1',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\CarpetaHija2',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\ArchivoMD1.md',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\ArchivoMD2.md',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\powerPoint.pptx'];

  const arrayTest2 = ['C:\\Users\\chris\\Downloads\\CarpetaPrueba\\ArchivoMD1.md',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\ArchivoMD2.md',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\powerPoint.pptx',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\CarpetaHija1\\ArchivoMD3.md',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\CarpetaHija1\\ArchivoMD4.md',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\CarpetaHija1\\Nuevo Documento de texto.txt',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\CarpetaHija2\\ArchivoMD5.md',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\CarpetaHija2\\CarpetaNieta\\carpetaSubCarpeta\\OtraCarpeta\\ArchivoMD6.md'];

  it('Debería retornar un array con 8 archivos', () => {
    expect(saveFiles(arrayTest1)).toEqual(arrayTest2);
  });
});

describe('filterMdFiles', () => {
  const arrayTest1 = ['C:\\Users\\chris\\Downloads\\CarpetaPrueba\\ArchivoMD1.md',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\ArchivoMD2.md',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\powerPoint.pptx',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\CarpetaHija1\\ArchivoMD3.md',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\CarpetaHija1\\ArchivoMD4.md',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\CarpetaHija1\\Nuevo Documento de texto.txt',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\CarpetaHija2\\ArchivoMD5.md',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\CarpetaHija2\\CarpetaNieta\\carpetaSubCarpeta\\OtraCarpeta\\ArchivoMD6.md'];

  const arrayTest2 = ['C:\\Users\\chris\\Downloads\\CarpetaPrueba\\ArchivoMD1.md',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\ArchivoMD2.md',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\CarpetaHija1\\ArchivoMD3.md',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\CarpetaHija1\\ArchivoMD4.md',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\CarpetaHija2\\ArchivoMD5.md',
    'C:\\Users\\chris\\Downloads\\CarpetaPrueba\\CarpetaHija2\\CarpetaNieta\\carpetaSubCarpeta\\OtraCarpeta\\ArchivoMD6.md'];

  it('Debería retornar un array con rutas de archivos de tipo Markdown', () => {
    expect(filterMdFiles(arrayTest1)).toEqual(arrayTest2);
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
      file: 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2\\mdfile2.md',
    },
  ];
  const arrayTest2 = [
    {
      href: 'http://community.laboratoria.la/c/js',
      text: 'Broken',
      file: 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2\\mdfile2.md',
    },
  ];
  it('Debería retornar un array con file, href, ok, status y text del link', () => getStatusLink(arrayTest1)
    .then((response) => {
      const statusLink = [
        {
          href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
          text: 'Link prueba 1',
          file: 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\sample\\sample2\\mdfile2.md',
          status: 200,
          ok: 'ok',
        },
      ];
      expect(response).toEqual(statusLink);
    }));
  expect.assertions(1);
  it('Debería fallar la petición de fetch', () => getStatusLink(arrayTest2)
    .catch((error) => {
      expect(error).toBe('Failed request'); // debería fallar
    }));
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
