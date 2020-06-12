Multiidiomas
========
#### Configurar un sitio multi-idiomas
```
Instalar los módulos:
- Configuration Translation.- Traducir las configuraciones. (Ttulo de un bloque, etc) 
- Content translation.- Traducir entidades de contenido. (Nodos, Media, Taxonomías, etc)
- Interface translation.- Traducir la interface de usuario.
- Language.- Configurar los idiomas disponibles y su aplicación al contenido.

1. Agregar idiomas.
/admin/config/regional/language

2. Configurar detección y selección.
/admin/config/regional/language/detection

3. Agregar el selector de idiomas.
Utilizar el bloque "Language switche"

4. Configurar elementos que van a ser traducibles.
/admin/config/regional/content-language
Lista de entidades que van a ser traducibles. 
Es necesaro elegir cuales(content, taxonomies, etc) y sus elementos internos como los campos.

5. Traducir la interface gráfica:
/admin/config/regional/translate
Permite traducir todos los textos del código fuente de drupal.
- Configuración YML.
- Código PHP.
- Código Javascript.

6. Traducir configuración.
/admin/config/regional/config-translation
Views, Bloques, Formularios, Tipos de contenidos, Formatos de fecha, Estilos de imágen, etc.
```

#### Programar etiquetas en otros idiomas

```
// En php
t('Instalación', array(), array('langcode' => 'es', 'context' => 'khipu' ))

// En javascript
Drupal.t('Delirant'))
Drupal.t('Mayo', {}, {context: "Calendario", 'langcode': 'es'});

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

ENLACES Y FUENTES
=================
Documentación traducción de código drupal
https://www.drupal.org/developing/api/8/localization

Documentación traducción twig
http://symfony.com/doc/current/book/translation.html
