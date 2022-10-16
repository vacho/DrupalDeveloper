PHP
===
### Cambiar entre versiones de php
```bash
sudo update-alternatives --config php
sudo a2dismod php7.4
sudo a2enmod php8.1
sudo systemctl restart apache2
```

#### Comparadores cortos
```php
// Asignación de valor en if/else.
$result = $condition ? 'foo' : 'bar';

// Asignación con conparación a nulo.
$result = $variable ?? 'valor_si_variable_no_es_nulo'; // 'fallback'
```

#### Gestión de rutas, directorio y archivos
```php
$_SERVER[REQUEST_URI]
//Ruta actual del proyecto
getcwd()

//Ruta host (sin http://)
$_SERVER[HTTP_HOST]

//Ruta url despues del host
$_SERVER[REQUEST_URI]

//Ruta base con protocolo
$baseUri = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";

//Llamar una página en background
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://example.com/Set.cgi?Image=1");
curl_setopt($ch, CURLOPT_HEADER, false);
curl_exec($ch);
curl_close($ch);
```

#### Documentar una variable como una clase
```php
/* @var $edit_operation_url \Drupal\Core\Url */
$edit_operation_url = $operations['edit']['url'];
```

#### Gestión de arreglos
```php
//Recorrido
$arr = [1, 2, 3, 4];
foreach ($arr as &$value) {
    $value = $value * 2;
}

//Agregar campos en un array asociativo
$options = [];
foreach ($stores as $store) {
  $options = $options + [
    $store->getId() => $store->getName(),
  ];
}

//Agregar array en un array de arrays asociativos
$options = [];
foreach ($stores as $store) {
  $options[] = [
    $store->getId() => $store->getName(),
  ];
}

//Array de arrays asociativos
$eventsTaron[] = [
  'id' => $idEvent,
  'city' => $event['city_name'],
  'country' => $event['country_name'],
  'place' => $place,
  'product_type' => $productType,
  'date' => $event['event_date'],
];

```

#### Gestión de números
```php
//Redondeo
round( $my_number, 2, PHP_ROUND_HALF_UP)
```

Gestión de objetos
```
//Clonando un objeto
$dateEvent = $event->getInitTime();
$deadline = clone $dateEvent;

//Si un objeto es de cierto tipo
if ($questionAnswer instanceof Question)
...
```

#### Gestion de cadenas
```php
//Remplazar ocurrencias de una cadena por otra cadena
$resultado = str_replace("texto a remplazar", "texto remplazador", "texto original");

//Obtener un pedazo de una cadena
$resultado = substr( "texto original" , 0, 4); //retorna "texto"

//convertir un arreglo en un string
$array = array('apellido', 'email', 'telefono');
$comma_separated = implode(",", $array);//apellido,email,telefono

//posición de una cadena
if (strpos($a,'are') !== false) {
  echo 'true';
}

//funcion para obtener una cadena entre otras cadenas
function get_string_between($string, $start, $end){
  $string = " ".$string;
  $ini = strpos($string,$start);
  if ($ini == 0) return "";
  $ini += strlen($start);
  $len = strpos($string,$end,$ini) - $ini;
  return substr($string,$ini,$len);
}

$fullstring = "this is my [tag]dog[/tag]";
$parsed = get_string_between($fullstring, "[tag]", "[/tag]");

//Partir una cadena en arreglo
$pieces = explode(" ", $pizza);

``` 

#### Timestamp y fechas
```php
$now = time() //Ahora...
$iniDay = strtotime("midnight", $now); //inicio del día
$endDay = strtotime("tomorrow", $iniDay) - 1; //final del día

//Año actual
$year = date("Y");

//Convertir string a timestamp
$date_of_request = $request->request->get('date_of_request');
$created = strptime($date_of_request, '%d/%m/%Y');
$timestamp = mktime(0, 0, 0, $created['tm_mon']+1, $created['tm_mday'], $created['tm_year']+1900);

//Convertir timestamp a Date
date('m/d/Y', 1299446702);

//Convertir Date a timestamp
strtotime($time);

//Aumentar n(30) días a una fecha
$date = date('Y-m-d H:i:s', strtotime($date. ' + 30 days'));

//Zona horaria Ej: America/La_paz
date_default_timezone_get()

//UTC
$dec =  floatval(date('Z'));
$seconds = $dec;
$hours = intval($dec/3600);
$seconds -= $hours * 3600;
$minutes = floor($seconds / 60);
$utc = $this->getHours($hours).":".$this->getMins($minutes);

```

#### Errores
```php
// escribir en el log de errores de apache
error_log("Pablito clavo un clavito...!", 0);
```

#### Javascript
```php
//Codificar un arreglo php para ser rescatado desde js
$arrayEncodedToJs = json_encode($array);

//Recuperar en un arreglo de php un arreglo js codificado
$arrayDecodedFromJs = json_decode($array);
```

#### Google API
```php
//Librería oficial
https://developers.google.com/api-client-library/php/

//Repositorio
https://github.com/google/google-api-php-client

//Lista de apis
https://www.googleapis.com/discovery/v1/apis?fields=items(title,discoveryLink)

//Lista de scopes de una api (ejemplo Calendar API)
https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest?fields=auth(oauth2(scopes))

//Buen post
http://googleappsdeveloper.blogspot.com.es/2012/01/tips-on-using-apis-discovery-service.html

//Guia completa del API de google
https://developers.google.com/google-apps/products

```

### Multiversiones
https://ostechnix.com/how-to-switch-between-multiple-php-versions-in-ubuntu/

POO
===
INTERFACES
- Permiten especifcar los métodos que va contener una clase.
- Todos los métodos declarados en una interface son públicos.
- Es posible declarar constructores.
- Pueden ser extendidas por el operador "extend"
- Son clases template de otras clases y en programación moderna se los usa directamente para instanciar esas otras clases que lo usan de template.
```php
interface iTemplate {
  public function setVariable($name, $var);
}

class Template implements iTemplate {
  private $vars = array(); 
  public function setVariable($name, $var) {
    $this->vars[$name] = $var;
  }
}
```
```php
// Una clase puede implementar n interfaces.
// Se usa para estandarizar clases.
interface A {
  ...
}
interface B {
  ...
}

class C implements A, B {
  ...
}
```
```php
// Un interface puede ser implementada por n clases.
// se usa para estandarizar los nombres de los métodos de un grupo de clases equivalentes.
interface A {
  ...
}
class B implements A {
  ...
}
class C implements A {
  ...
}
```

TRAITS
- Permiten declaran métodos abstractos y no abstractos que pueden ser usados por múltiples clases.
- Resuelven el problema de que una clases no puede heredar de muchas otras clases
```php
trait message1 {
public function msg1() {
    echo "OOP is fun! ";
  }
}

class Welcome {
  use message1;
}

$obj = new Welcome();
$obj->msg1();
?>
```

PHP 7 nuevas sintaxis
===
NULLABLE
```php
// Puede retornar NULL o String
function a(): ?string { }

// Puede recibir como parámetro NULL o String, pero no "valor vacio"
function test(?string $name) { }
```
STRICT MODE
```php
// Los tipos de datos se respetan de manera estrícta.
<?php declare(strict_types=1); // strict mode
```
RETURN TYPE
```
// Declaración explísita del tipo de dato del retorno para int, float, string, bool.
function FunctionName ($a, $b) : string  {
  return $a.$b;
}
```

Referencias
====
Programación orientada a objetos
- http://www.startutorial.com/homes/oo_beginner

Buena guía de curl (ingles)
- http://codular.com/curl-with-php

Patrones de diseño: Interfaces
- https://phptherightway.com/pages/Design-Patterns.html

