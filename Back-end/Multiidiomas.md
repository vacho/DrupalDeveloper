Multiidiomas
========
#### Configurar un sitio multi-idiomas
```md
Instalar los módulos:
- Configuration Translation.- Traducir las configuraciones. (Ttulo de un bloque, etc) 
- Content translation.- Traducir entidades de contenido. (Nodos, Media, Taxonomías, etc)
- Interface translation.- Traducir la interface de usuario.
- Language.- Configurar los idiomas disponibles y su aplicación al contenido.

1. Agregar idiomas.
- /admin/config/regional/language

2. Configurar detección y selección.
- /admin/config/regional/language/detection

3. Agregar el selector de idiomas.
- Utilizar el bloque "Language switche"

4. Configurar elementos que van a ser traducibles.
- /admin/config/regional/content-language
- Lista de entidades que van a ser traducibles. 
- Es necesaro elegir cuales(content, taxonomies, etc) y sus elementos internos como los campos.

5. Traducir la interface gráfica:
- /admin/config/regional/translate
Permite traducir todos los textos del código fuente de drupal.
- Configuración YML.
- Código PHP.
- Código Javascript.

6. Traducir configuración.
- /admin/config/regional/config-translation
Views, Bloques, Formularios, Tipos de contenidos, Formatos de fecha, Estilos de imágen, etc.
```

#### Programar etiquetas en otros idiomas

```php
// En php
t('Instalación', array(), array('langcode' => 'es', 'context' => 'khipu' ))

// En javascript
Drupal.t('Delirant'))
Drupal.t('Mayo', {}, {context: "Calendario", 'langcode': 'es'});
```

```twig
// En twig
{{ 'Free carita gift box'|t }}

<label>
{% trans with {'context': 'khipu', 'langcode': 'es'} %}
Delirante
{% endtrans %}
</label>

<label>
{{ 'Delirante'| trans({'context': 'pms', 'langcode': 'es'}) }}
</label>

<input value="{% trans 'Delirio' with {'context': 'pms', 'langcode': 'es'} %}">
```

```yml
// En yml
quotation.proposal:
  path: '/quotations/proposal'
  defaults:
   _form: '\Drupal\inventory_io\Form\ProposalForm'
   _title: 'Propuesta'
   _title_context: 'khipu'
   langcode: es
  requirements:
    _permission: quotation.proposal
```

#### Manipulación programática
Utilizar version traducida de una entidad.

```php
$category = Term::load($id_category);
$curr_langcode = \Drupal::languageManager()->getCurrentLanguage(\Drupal\Core\Language\LanguageInterface::TYPE_CONTENT)->getId();
$translated = \Drupal::service('entity.repository')->getTranslationFromContext($category, $curr_langcode);
```

Utilizar el manejador de lenguaje del core
```php
$language_manager = \Drupal::languageManager();
$site_default_langcode = $language_manager->getDefaultLanguage()->getId();

// Obtener las configuraciones de un lenguage
$config_name = basename($file_name, '.yml');
$config = $language_manager->getLanguageConfigOverride($langcode, $config_name);
// Ejemplo
$langcode = \Drupal::languageManager()->getCurrentLanguage()->getId();
$config_name = basename('role_expire_notification.config', '.yml');
$config = \Drupal::languageManager()->getLanguageConfigOverride($langcode, $config_name);
$configuration_values = $config->get('role_expire_notification_points');
```


ENLACES Y FUENTES
=================
Documentación traducción de código drupal
- https://www.drupal.org/developing/api/8/localization

Documentación traducción twig
- http://symfony.com/doc/current/book/translation.html
