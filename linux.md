Administración sistema operativo
===
```
Version sistema Operativo
  $ cat /etc/*-release
Ver memoria utilizada
  $ free
  $ free -m
Ver los recursos usados por el sistemma
  $ top
  $ htop
Ver todos los procesos
  $ ps
  $ pstree
  Ejemplos:
  $ ps -A | grep firefox
  $ pgrep firefox
Matar un proceso dandol el id
  $ kill <id>
Monitor de procesos en tiempo real: cpu, memoria, capas de red, prioridad, etc
  $ atop
muestra el tamaño aprox. en GB
  $ df -h 
muestra el tamaño aprox. en nodos
  $ df -i

```

Gestion de archivos
===
```
Ver el peso de una carpeta/archivo recursivamente
  $ du -sh nombre_carpeta
Calcula el tamaño real de los directorios
  $ du -h --max-depth=1
Descomprimir tar.gz
  $ tar -xzvf nombre_archivo.tar.gz
Comprimir tar.gz
  $ tar -zcvf nombre_archivo.tar.gz nombre_carpeta
Accesos carpeta
  $ cd carpeta
  $ cd ..
Mover archivos
  $ mv carpeta nueva_carpeta
  $ mv archivo.extension archivo_nuevo.extension
Copiar archivos
  $ cp -R carpeta nueva_carpeta
  $ cp archivo archivo_nuevo
Listar archivos
  $ ls
  $ ls /ruta/carpeta
  //archivos ocultos
  $ ls -a
  //ver propiedades de los archivos
  $ ls -l
  //combinamos propiedades y archivos ocultos
  $ ls -la
Cambiar permisos
  $ chmod 775 -R /ruta/carpeta
  4->lectura
  2->escritura
  1->ejecución
Cambiar dueño
  $ chown usuario:grupo /ruta/carpeta
Enlaces simbólicos
  $ ln -s /ruta/carpeta/ nombre_enlace
Posibilitar que un archivo se ejecute desde cualquier lugar llamando desde la consola
  $ mv archivo.phar /usr/local/bin/nombre_comando
Buscar en el contenido de los archivos
  $ grep -lir "texto buscado"
Buscar en el contenido de los archivos con retorno parcial del contenido
  $ grep -r "texto buscado"
```
Redes
===
```
Lista todas las interfaces de red y su estado
  $ rfkill list all
```

Gestion Ubuntu
===
```
Instalar .deb mediante consola
  $ sudo dpkg -i google-chrome-stable_current_i386.deb
  
Trabajar con la consola en múltiples ventanas
  $ sudo apt-get install screen
  $ screen
  Dividir horizontalmente
  $ ctrl a + shift s
  Dividir verticalmente
  $ ctrl a + shift \
  Cambiar de ventana
  $ ctrl a + tab
  Establecer misma sesión en la ventana
  $ ctrl a + 0-9
  Establecer nueva sesión en la ventana
  $ ctrl a + c
  Redimencionar la ventana
  $ ctrl a :resize enter <numero_líneas>
  Remover una region
  $ ctrl+a :remove

Utilitario que incrementa la eficiencia con el trabajo en la consola
  $ sudo apt-get install fish

Descargar un archivo de internet
  $ wget http://www.nombreweb.com/archivo.ext
```

Referencias
===
Screen
http://www.pixelbeat.org/lkdb/screen.html
Corregir los permisos de los archivos
http://boomshadow.net/tech/fixes/fixperms-script/
https://forums.cpanel.net/threads/fix-permissions-in-accounts.73414/
