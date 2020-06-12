TWIG
========
#### Debuguear (Depurar/destripar variables, errores)
```
// Habilitar debug: En sites/default/services.yml
parameters:
  twig.config:
    debug: true 
    
// Imprimir variables: Se debe activar los módulos devel y kint
{{ kint(nombre_variable) }}

// Se puede usar el plugin de firefox "firebug" activando "Show comments"

```

#### Texto traducible del ingles
```

{% trans %} Hello baby {% endtrans %}

```
#### Texto con contexto e idioma fuente
```
<label>
{% trans with {'context': 'Expreciones', 'langcode': 'es'} %}
Delirante
{% endtrans %}
</label>

<input value="{% trans 'Delirio' with {'context': 'Estados persona', 'langcode': 'es'} %}">
```

ENLACES Y FUENTES
=================
Documentación de la comunidad
https://www.drupal.org/node/1906392

Sitio oficial de twig contiene documentación 
http://twig.sensiolabs.org/
