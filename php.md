PHP
===
Gestión de rutas, directorio y archivos

```$_SERVER[REQUEST_URI]
//Ruta actual del proyecto
getcwd()

//Ruta host (sin http://)
$_SERVER[HTTP_HOST]

//Ruta url despues del host
$_SERVER[REQUEST_URI]

//Llamar una página en background
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://example.com/Set.cgi?Image=1");
curl_setopt($ch, CURLOPT_HEADER, false);
curl_exec($ch);
curl_close($ch);
```

Gestión de arreglos
```
//Recorrido
$arr = array(1, 2, 3, 4);
foreach ($arr as &$value) {
    $value = $value * 2;
}

//Agregar elementos en un array asociativo
$options = array();
foreach ($stores as $store) {
  $options = $options + array(
    $store->getId() => $store->getName(),
  );
}

```
Gestión de números
```
//Redondeo
round( $my_number, 2, PHP_ROUND_HALF_UP)
```

Gestion de cadenas
```
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

Timestamp y fechas
```
$now = time() //Ahora...
$iniDay = strtotime("midnight", $now); //inicio del día
$endDay = strtotime("tomorrow", $iniDay) - 1; //final del día

//Año actual
$year = date("Y");

//Convertir timestamp a Date
date('m/d/Y', 1299446702);

```

Referencias
====

