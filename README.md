# 📎Proyecto: MD-Links

## 📍1. Introducción

**MD-Links** es una librería para JavaScript que le permite validar las URLs que se encuentren dentro de archivos Markdown(.md) el cual es un lenguaje de marcado ligero muy popular entre desarrolladores. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...) y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio.
Esta librería te permitirá obtener: estado de los enlaces, enlaces totales, enlaces únicos y enlaces rotos.📎💻

![md-links](https://github.com/lindalopezc/LIM17-md-links/blob/main/img/links-img.jpg)

## 📍2. Instrucciones de uso

Estas instrucciones le permitirán instalar la biblioteca en su computadora local para el desarrollo.
Las rutas ingresadas pueden ser relativas o absolutas y las opciones que puede usar son: `--stats`, `--validate` o usar ambas juntas: `--stats --validate`.

### Instalación
Puedes hacer la instalación por npm:

```sh
npm i md-links-linlopezr
```

Puedes ejecutar la librería a través de la terminal iniciando con el término `md-links` seguido de la ruta que desea analizar y las opciones --validate y/o --stats.
Veamos cada caso en detalle:

#### Caso 1:

```sh
md-links <ruta de archivo>
```
Los valores de retorno son:

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

*Ejemplo:*

[md-links](https://github.com/lindalopezc/LIM17-md-links/blob/main/img/ejemplo1.png)

#### Caso 2:

```sh
md-links <ruta de archivo> --validate
```
Los valores de retorno son:

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

*Ejemplo:*
[md-links](https://github.com/lindalopezc/LIM17-md-links/blob/main/img/ejemplo2.png)

#### Caso 3:

Si ingresamos la opción `--stats`

```sh
md-links <ruta de archivo> --stats
```
Los valores de retorno son:

* `Total`: total de links encontrados en archivos Markdown
* `Unique`: total de links únicos.

*Ejemplo:*
[md-links](https://github.com/lindalopezc/LIM17-md-links/blob/main/img/ejemplo3.png)

#### Caso 4:

Si ingresamos las opciones `--stats` `--validate`

```sh
md-links <ruta de archivo> --stats --validate
```
o tambien:

```sh
md-links <ruta de archivo> --validate --stats
```
Los valores de retorno son:

* `Total`: total de links encontrados en archivos Markdown
* `Unique`: total de links únicos.
* `Broken`: total de links rotos.

*Ejemplo:*
[md-links](https://github.com/lindalopezc/LIM17-md-links/blob/main/img/ejemplo4.png)

## 📍3. Proceso de desarrollo:

Como punto de partida para la ejecución de este proyecto, se diseñó un diagrama de flujo para organizar el flujo de la API.
![diagrama-flujo](https://github.com/lindalopezc/LIM17-md-links/blob/main/img/MD-Links%20Linda%20L%C3%B3pez.jpg)

Se utilizó las siguientes herramientas:
-[Node.js](https://nodejs.org/en/)-Usado para crear la librería.
-[npm](https://www.npmjs.com/)-Despliegue de módulo.
-[chalk](https://www.npmjs.com/package/chalk/v/4.1.0)-Usado para dar estilos en la terminal.
-[jest](https://jestjs.io/docs/api)-Testing de funcionalidad.

## 📍4. Autora
[Linda López Ramos](https://github.com/lindalopezc)💛
