GIT
===
```
//instalación en sistemas centos, redhat, tal vez fedora
$ yum install git
//instalación en sistemas debian, ubuntu
$ apt-get install git

//configuración de usuario
$ git config --global user.name "usuario"
$ git config --global user.email usuario@correo.com
$ git config --global core.editor emacs

//generar las llaves pública y privada
$ ssh-keygen -t rsa -C "usuario@correo.com"

//crear una rama o branch nueva
$ git branch crazy-experiment
$ git checkout crazy-experiment
... codificar cambios ...
$ git add -A
$ git commit -m "message..."
$ git push origin crazy-experiment

//visualizar una rama existente
$git checkout crazy-experiment

//ver el historial gráficamente
git log --graph --full-history --all --pretty=format:"%h%x09%d%x20%s"

//juntar una rama al master
$ git checkout master
$ git merge crazy-experimient 

//eliminar un branch
$ git branch -D crazy-experiment
$ git push origin :crazy-experiment
```
