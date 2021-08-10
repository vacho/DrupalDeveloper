Vistas
===

Recuperar una vista la configuración de un display
```php
use Drupal\views\Views;

$view = Views::getView('gestion_des_formulaires');
$view->setDisplay('page_2');
$display = $view->getDisplay();

if (isset($display->options['filter_groups']['operator'])) {
  $operator = $display->options['filter_groups']['operator'];
  $filter_operators = $display->options['filter_groups']['groups'];
  foreach ($display->options['filters'] as $filter) {
    if ($filter['exposed']) {
      //...
    }
  }
}
```

#### Filtros
Crear un filtro expuesto mediante plugins
- https://www.axelerant.com/resources/team-blog/creating-a-custom-exposed-view-filter-in-drupal-8-to-use-with-workflow-states
Agregar - customizar elementos del formulario del plugin.
- https://www.drupal.org/project/drupal/issues/2852299

Crear un filtro expuesto mediante hooks
- http://www.ermohitbansal.com/2019/08/31/how-we-can-create-custom-exposed-filter-in-views-and-fetch-results-accordingly-in-drupal-8/

Modificar filtro expuesto ajax mediante hook_form_alter + javascript
- https://leanderlindahl.se/filter-content-in-a-drupal-8-view-with-ajax/
- http://www.softdecoder.com/blog/dynamically-filter-content-drupal-view

#### Obtener datos
Obtener los datos de una vista programaticamente
- https://jbloomfield.codes/2018/09/24/drupal-8-getting-data-from-viewfield.html

#### Manipular view
Ejecutar una vista programaticamente
- https://www.trivali.be/blog/drupal-8-execute-a-view-programmaticaly

Customizar crear propio paginador
- http://djevans.info/article/creating-views-pager-plugins-drupal-8
- https://blog.werk21.de/en/2017/04/21/programmatically-change-views-pager-type-or-options
