GIT
===
```
Instalación en sistemas debian, ubuntu
  $ apt-get install git

Instalación en sistemas centos, redhat, tal vez fedora
  $ yum install git

Configuración de usuario
  $ git config --global user.name "usuario"
  $ git config --global user.email usuario@correo.com
  $ git config --global core.editor emacs

Generar las llaves pública y privada
  $ ssh-keygen -t rsa -C "usuario@correo.com"

Crear una rama o branch nueva
  $ git branch crazy-experiment
  $ git checkout crazy-experiment
  ... codificar cambios ...
  $ git add -A
  $ git commit -m "message..."
  $ git push origin crazy-experiment

Visualizar una rama existente
  $git checkout crazy-experiment

Ver el historial gráficamente
  $git log --graph --full-history --all --pretty=format:"%h%x09%d%x20%s"

Juntar una rama al master
  $ git checkout master
  $ git merge crazy-experimient 

Eliminar un branch
  $ git branch -D crazy-experiment
  $ git push origin :crazy-experiment
```
