DOCKER
========
#### Instalar docker en ubuntu 18.04
```
Desinstalar versiones antiguas de docker
$ sudo apt-get -y remove docker docker-engine docker.io
$ sudo apt-get update

Instalar paquetes necesarios para la instalación
$ sudo apt-get install -y apt-transport-https software-properties-common ca-certificates curl wget

Agregar clave GPG para el repositorio de Docker
$ wget https://download.docker.com/linux/ubuntu/gpg 
$ sudo apt-key add gpg
$ sudo apt-get update

Verificar si existe un repositorio oficial disponible para la instalación
$ sudo apt-cache policy docker-ce
En caso de no tener un repositorio agregar esta linea en el archivo /etc/apt/sources.list.d/docker.list
deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic edge NIGHTLY

Actualizar la base de datos de paquetes
$ sudo apt-get update

Instalar Docker
$ sudo apt-get -y install docker-ce

Decirle al sistema que arranque siempre con docker
$ sudo systemctl start docker
$ sudo systemctl enable docker

Verificar que docker funciona correctamente
$ sudo docker run hello-world

Opcional: Agregar usuario al grupo docker para evitar esribir sudo todo el tiempo
$ sudo usermod -aG docker <nombre_usuario>
```


#### Instalar docker en ubuntu 16.04
```
Crear una cuenta de usuario que no sea root, con privilegios de sudo
$ adduser docker
$ usermod -aG sudo docker

Actualizar la base de datos de paquetes
$ sudo apt-get update

Agregar la clave GPG para el repositorio oficial de Docker al sistema
$ sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D

Agregar el repositorio Docker a fuentes APT
$ sudo apt-add-repository 'deb https://apt.dockerproject.org/repo ubuntu-xenial main'

Actualizar la base de datos de paquetes
$ sudo apt-get update

Verificar que está a punto de instalar desde el repositorio de Docker en lugar del repositorio predeterminado de Ubuntu
$ apt-cache policy docker-engine

Instalar Docker
$ sudo apt-get install -y docker-engine

Comprobar que docker se está ejecutando
$ sudo systemctl status docker

Opcional: Agregar usuario al grupo docker para evitar esribir sudo todo el tiempo
$ sudo usermod -aG docker <nombre_usuario>

```

#### Montar drupal y ejecutarlo
```
Bajar contenedor oficial de drupal ()
$ docker pull drupal

Ejecutar drupal con base de datos SQLite
$ docker run --name some-drupal -p 8080:80 -d drupal

Ver en el navegador esta instancia:
http://localhost:8080

```



ENLACES Y FUENTES
=================
Instalar docker en ubuntu 16.04
https://www.digitalocean.com/community/tutorials/como-instalar-y-usar-docker-en-ubuntu-16-04-es

Instalar docker en ubuntu 18.04
https://www.itzgeek.com/how-tos/linux/ubuntu-how-tos/how-to-install-docker-on-ubuntu-18-04-lts-bionic-beaver.html
https://linuxconfig.org/how-to-install-docker-on-ubuntu-18-04-bionic-beaver

Contenedor oficial de drupal
https://hub.docker.com/_/drupal/

Comandos de docker
https://docs.docker.com/engine/reference/commandline/docker/

Entorno drupal con las herramientas más útiles
https://cloud.wodby.com/stackhub/ada51e9b-2204-45ee-8e49-a4151912a168/overview

