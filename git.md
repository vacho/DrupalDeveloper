GIT
===
```
Instalación en sistemas debian, ubuntu
  $ apt-get install git

Instalación en sistemas centos, redhat, tal vez fedora
  $ yum install git

Configuración de usuario
  $ git config --global user.name usuario
  $ git config --global user.email usuario@correo.com
  $ git config --global core.editor emacs

Generar las llaves pública y privada
  $ ssh-keygen -t rsa -C usuario@correo.com

Crear una rama o branch nueva
  $ git branch crazy-experiment
  $ git checkout crazy-experiment
  ... codificar cambios ...
  $ git add -A
  $ git commit -m "message..."
  $ git push origin crazy-experiment

Cancelar commint (antes de hacer push)
  $ git reset --hard HEAD~1
  
Ver cambios de un commit
  $ git show <id_commit>

Visualizar una rama existente
  $git checkout crazy-experiment

Ver el historial gráficamente
  $git log --graph --full-history --all --pretty=format:"%h%x09%d%x20%s"
Ver el historial de un archivo
  $git log /ruta/archivo
Ver el historial de un usuario
  $git log --author="vacho"

Juntar una rama al master
  $ git checkout master
  $ git merge crazy-experimient 

Eliminar un branch
  $ git branch -D crazy-experiment
  $ git push origin :crazy-experiment

Ver aportes de líneas a un archivo
  $ git blame /ruta/archivo
  
Ver cambios en un archivo
  $ git diff /ruta/archivo

```  
Trabajar como fork de un repositorio y actualizar
===
```
# Añadir repositorio remoto, llamarlo "upstream":
git remote add upstream https://github.com/whoever/whatever.git

# Extraer todos los branchs
git fetch upstream

# Estar seguro de que se está en el branch master
git checkout master

# Reescribir todos los commits
git rebase upstream/master
```
