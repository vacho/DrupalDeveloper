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
```
