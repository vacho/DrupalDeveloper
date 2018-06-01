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

Gestión usuarios
===
```
Listar usuarios locales
  $ cut -d: -f1 /etc/passwd
Listar todos los grupos de usuario formato Grupo:Contraseña:ID_Grupo(GID):Lista de usuarios
  $ cat /etc/group
Agregar usuario y crear su propio grupo
  $ sudo useradd nombre_usuario
Asignar el usuario al grupo del root
  $ usermod -aG sudo nombre_usuario
Asignar el usuario al grupo de apache
  $ usermod -aG www-data nombre_usuario
```

Gestion de archivos
===
```
Limpiar todo el contenido de un archivo (para limpiar logs)
  $ truncate -s0 error_log
Ver el peso de una carpeta/archivo recursivamente
  $ du -sh nombre_carpeta
Calcula el tamaño real de los directorios
  $ du -h --max-depth=1
Descomprimir tar.gz
  $ tar -xzvf nombre_archivo.tar.gz
Comprimir tar.gz
  $ tar -zcvf nombre_archivo.tar.gz nombre_carpeta
Comprimir 7z
  $ 7z a FacturasAExcepcionar.7z FacturasAExcepcionar.txt
Descomprimir .gz
  $ gunzip nombre_archivo.gz
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

FISH: Utilitario que incrementa la eficiencia con el trabajo en la consola
  Instalar
  $ sudo apt-get install fish
  
  Establecer fish como el shell por defecto del sistema operativo.
  $ chsh -s /usr/bin/fish

Descargar un archivo de internet
  $ wget http://www.nombreweb.com/archivo.ext
  
Reparar sistema de paquetería cuando estan rotos
  $ sudo apt-get -f install
  $ sudo dpkg --configure -a
  $ sudo apt-get autoremove
  $ sudo apt-get clean
  $ sudo rm /var/lib/apt/lists/* -vf
  $ sudo apt-get update
  
```

Servidor email para envío sólamente desde php
===
```
Instalamos sendmail
  $ sudo apt-get install sendmail
Configuramos sendmail (se pone Si a las preguntas)
  $ sudo sendmailconfig
Editamos el archivo hosts
  $ sudo vim /etc/hosts
Ponemos este contenido en el principio del archivo. Comentando si hay algo similar
  127.0.0.1 localhost localhost.localdomain your_domain_name_here.com
  Ejemplo real:
  127.0.0.1 localhost localhost.devtest.com skynet
Reiniciamos apache  

AYUDAS:  
Obtener el nombre del host (your_domain_name_here.com)
  $ hostname

```


Buscar y reemplazar
===
```
Buscar archivos por patrón de nombre:
  $ find /path -type f -iname '*name*'
Buscar directorios por patrón de nombre:
  $ find /path -type d -iname '*name*'

Buscar recursivamente por debajo de directorio actual dentro de archivos por patrón:
  $ grep -rie 'bank'

Buscar archivos por nombre y reemplazar por otra palabra (tener cuidado, probar antes comando anterior):
  $ find /path -type f -exec sed -i 's/bank/Bank/g' {} \;

```

Conectar entre servidores
===
```
Copiar archivo de un servido a tu equipo  
  $ sudo scp -P 2222 nombres_usuario@ip_servidor:/ruta_al_archivo /ruta_destino
```

Referencias
===
Screen
http://www.pixelbeat.org/lkdb/screen.html

Corregir los permisos de los archivos
http://boomshadow.net/tech/fixes/fixperms-script/
https://forums.cpanel.net/threads/fix-permissions-in-accounts.73414/

Acceso remoto a servidor por linea de comandos
http://www.hypexr.org/linux_scp_help.php

Enviar emails desde php
http://lukepeters.me/blog/getting-the-php-mail-function-to-work-on-ubuntu
https://gist.github.com/adamstac/7462202
