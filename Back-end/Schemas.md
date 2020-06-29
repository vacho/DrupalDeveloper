Schemas
========

#### Debug con drush
Ver todas las incidencias
```
$ drush config:inspect
```

Ver detalle de una configuración
```
$ drush config:inspect --detail page_manager.page_variant.site_template-default
```

#### Reparar el mapping
```
function mi_modulo_config_schema_info_alter(&$definitions) {
  // @todo: Remove once https://www.drupal.org/project/menu_multilingual/issues/2956990 is fixed.
  if (isset($definitions['block.settings.system_menu_block:*.third_party.menu_multilingual']['mapping']) && isset($definitions['block.settings.system_menu_block:*']['mapping'])) {
    $definitions['block.settings.system_menu_block:*']['mapping'] = array_merge($definitions['block.settings.system_menu_block:*']['mapping'], $definitions['block.settings.system_menu_block:*.third_party.menu_multilingual']['mapping']);
  }
}
```

ENLACES Y FUENTES
=================
Documentación oficial
https://www.drupal.org/docs/drupal-apis/configuration-api/configuration-schemametadata

