ReactJS
====
#### Instalar librería necesarias
```
Instalar nodejs y su manegador de paquetes.
$ sudo apt-get update
$ sudo apt-get install nodejs
$ sudo apt-get install npm
$ ln -s /usr/bin/nodejs /usr/bin/node

Instalar reactjs y sus herramientas
$ npm install -g react-tools

BABEL: Estando en la carpeta donde se almacenan los js
Instalar babel
$ npm install babel-cli babel-preset-es2015 babel-preset-react
Ejecutar babel
$ node_modules/.bin/babel --presets es2015,react --watch babel --out-dir transformed
```

#### Referenciar codigo en archivo.libraries.yml 
searcher:
version: 1.x
js:
js/react.min.js: {}
js/react-dom.min.js: {}
js/browser.min.js: {}
js/transformed/searcher.js: {}

### Referencias
Instalar nodejs
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server

Probar babel
https://news.ycombinator.com/item?id=10473687
https://facebook.github.io/react/docs/tooling-integration.html

