Migrar un sitio completo de drupal 7 a drupal 8
========

#### Resumen del proceso
```
Preparar sitio D7 > Prepara sitio D8 > Migrar > Configuraciones manuales.
```

#### Preparar D7 para ser migrado.
```
1. Tener el sitio en local.
2. Identificar los módulos contribuidos a ser migrados.
admin/reports/updates
  Para cada módulo contestar
  Necesito este módulo en D8?
  Si => Está el módulo incluido en el core de D8?
        Si => Utilizarlo.
        No => Existe este módulo para D8?
              Si => Utilizarlo.
              No => Existe otro módulo para D8 que cumpla la misma función?
                    Si => Agregarlo manualmente.
                    No => Resignar o implementar una solución custom. Sin embargo posiblemente esta funcionalidad ya no está vigente.
3. Revizar y conocer los problemas conocidos que tiene actualmente el proceso en 
https://www.drupal.org/docs/8/upgrade/known-issues-when-upgrading-from-drupal-6-or-7-to-drupal-8#s-drupal-7-to-8
4. Actualizar el core y todos los módulos contribuidos.
5. Verificar el acceso público(navegador) a los archivos públicos (public files)
```

#### Preparar D8 par la migración.
```
1. Tener una instalación limpia(sin contenido ni configuraciones adicionadas).
2. Tener acceso a la base de datos de D7 y D8 desde el mismo host.
En D8 configurar settings.php
$databases['default']['default'] = [
  'database' => 'd8db',
  'username' => 'd8user',
  'password' => 'd8pass',
  'prefix' => '',
  'host' => 'localhost',
  'port' => '3306',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
];

$databases['migrate']['default'] = [
  'database' => 'd7db',
  'username' => 'd7user',
  'password' => 'd7pass',
  'prefix' => '',
  'host' => 'localhost',
  'port' => '3306',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
];
3. Si se necesitan migrar archivos privados de D7
   Estos deben ser accesibles desde D8 y se deben configurar file_private_path en settings.php antes de corres el upgrade.
4. Instalar Drush 8 o 9 en el proyecto.
   Si has instalado drupal mediante composer, yá tienes drush como una dependencia en composer.json  
   Si nó puedes ejecutar:
   $ composer require drush/drush
5. Instalar los siguientes módulos:
   - migrate (core)
   - migrate_drupal (core)
   - migrate_drupal_ui - Opcional, si se va hacer la migración por UI.
   - migrate_drupal_multilingual - Opcional, si es un sitio multiidiomas.
   - migrate_upgrade - Soporte para comandos drush de actualización de versión de drupal.
   - migrate_plus - Extensiones útiles al core de migrate.
   - migrate_tools - Comandos drush a utilizar en la migración.  
6. Habilitar todos los módulos homologados de D7 en D8.
7. Colocar el sitio en modo mantenimiento.
```

#### Migrar mediante navegador web.
```
Recomendado si eres novato en migraciones con Drupal.
1. Ir a la interface gráfica:  /upgrade
Seguir el procedimiento indicado.
```

#### Migrar mediante DRUSH.
```
Es la manera más robusta y veloz, pero requiere módulos adicionales y configuraciones.

UTILIZANDO COMANDOS DIRECTOS
2. Generar las migraciones usando migrate-upgrade.
Ver la lista de migraciones posibles.
$ drush migrate-status

Ejecutar todas las migraciones.
drush migrate-import --all 

Generar la migración completa en el sitio D7 desde el espacio D8 
$ drush migrate-upgrade

Si se necesita sólo migrar las configuraciones.
$ drush migrate-upgrade --legacy-db-url=mysql://user:password@server/db --legacy-root=http://url-del-sitio-d7.com --configure-only 

Ejecutar migraciones selectivamente. 
drush migrate-import <nombre_migración>
 

UTILIZANDO MANIFIESTOS 
1. Instalar el módulo migrate_manifest

Obtener la lista completa de migraciones en un archivo yml
# drush migrate-template-list //drush 8
# drush migrate:template:list //drush 9

2. Colocar el archivo yml en en un lugar accesible por drush. (de preferencia dentro del versionamiento de git)

3. Asegurarse de que todos los módulos usados en el manifiesto de migración existen y están habilitados en D8.

4. Ejecutar la las migraciones especificadas en el manifiesto.
$ drush migrate-manifest --legacy-db-url=mysql://d7user:d7pass@localhost/drupal_7 manifest.yml 
```

#### Configuraciones manuales.
```
Luego de migrar el contenido y las configuraciones. Es muy posible que hayan módulos que instalar, configuraciones que completar.
```

ENLACES Y FUENTES
=================
Documentación oficinal de drupal
https://www.drupal.org/docs/8/upgrade/upgrading-from-drupal-6-or-7-to-drupal-8-and-newer

Lista de módulos útiles para la migración
https://www.drupal.org/docs/8/upgrade/drupal-8-migrate-modules

Actualizar mediante navegador web
https://www.drupal.org/docs/8/upgrade/upgrade-using-web-browser

Actualizar mediante drush
https://www.drupal.org/docs/8/upgrade/upgrade-using-drush

