PHP
===
```
Gestión de archivos

```

Gestión de arreglos
```
//Recorrido
$arr = array(1, 2, 3, 4);
foreach ($arr as &$value) {
    $value = $value * 2;
}

```

Gestion de cadenas
```
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

``` 

Referencias
====

