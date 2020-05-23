Multiidiomas
========
#### Configurar un sitio multi-idiomas
```

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
