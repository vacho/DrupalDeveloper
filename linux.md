Administración sistema operativo
===
```
Version sistema Operativo
  $ cat /etc/*-release
```

Gestion de archivos
===
```
Descomprimir tar.gz
  $ tar -xzvf nombre_archivo.tar.gz
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
