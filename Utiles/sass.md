SASS
====
====
#### Instalar librería necesarias
```bash
# Instalar nodejs y su manegador de paquetes.
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
ln -s /usr/bin/nodejs /usr/bin/node
```

#### Instalar sass
```bash
sudo npm install -g node-sass
```

#### Trabajar en un proyecto
```bash
# Inicializar carpeta del proyecto
npm init
```

Editar pakage.json
```json
{
  "name": "sass-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "scss": "node-sass --watch scss -o css"
  },
  "author": "",
  "license": "ISC"
}
```
Comando para empezar a compilar archivo sass
```bash
node-sass --watch scss/eloqua-brands.scss css/eloqua-brands.css
```



#### Referencias
```
- https://sass-lang.com/install
- https://webdesign.tutsplus.com/tutorials/watch-and-compile-sass-in-five-quick-steps--cms-28275
```
