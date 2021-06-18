Rutas
========
#### Obtener rutas del proyecto
Obtener el host. Ej: drupal9.local
```php
$host = \Drupal::request()->getHost();
```

Obtener ruta base completa. Ej: https://drupal8.local
```php
$base_uri = \Drupal::request()->getSchemeAndHttpHost();;
```

#### Crear una ruta
En el archivo miarchivo.routing.yml
```yml
sale.onlyform.add:
  path: '/sales/sales-add'
  defaults:
    _form: '\Drupal\sales\Form\addsaleForm'
    _title: 'Sales'
  requirements:
    _permission: sale.onlyform.add
```
En el archivo miarchivo.permission.yml
```yml
sale.onlyform.add:
  title: 'Add Sale'
  description: 'Add Sale'
  restrict access: true
```
#### Crear urls
```php
  use Drupal\Core\Url;
  $Url = new Url($route_name, $params)​;

  // O mediante el método estático de la url
  $url = Url::fromRoute($route_name, $params)​
  // Ejemplo
  $url = Url::fromRoute('view.glossary_terms.glossary_page', ['arg_0' => 'all'])->toString();
```
#### Obtener una url
```php
  // Obtener la ruta actual
  $currentRoute = \Drupal::routeMatch();

  // o usando como base el nombre de la ruta
  $path = \Drupal::url($route_name)
  
  // Sin una ruta como base
  use Drupal\Core\Url;
  $Url = Url::fromUri('internal:/mypath/to/style.css');
```

#### Obtener nombre routing de la ruta actual
```php
$url_object = \Drupal::service('path.validator')->getUrlIfValid(\Drupal::service('path.current')->getPath());
$route_name = $url_object->getRouteName();
```

#### Parametros
```php
// Obtener un parametro
$currentRoute = \Drupal::routeMatch();
$query = $currentRoute->getParameter('nombre_parametro');

// Vs

$query = \Drupal::request()->query->get('name');
```

#### Redireccionamiento
```php
use Symfony\Component\HttpFoundation\RedirectResponse;

$response = new RedirectResponse("quotation?id=" . $idQuotationClient);
$response->send();

$path = Url::fromRoute('mi_nombre_ruta')->toString();
$response = new RedirectResponse($path);
$response->send();

// Para rutas externas usar TrustedRedirectResponse
```


#### Referencias
- Posibilidades de las rutas: 
https://www.drupal.org/node/2092643

- Cheatsheet 
https://cryptic.zone/blog/drupal-8-cheatsheet-developers

- Redireccionamiento
https://x-team.com/blog/drupal-goto/
