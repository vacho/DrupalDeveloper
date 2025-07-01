TWIG
========
#### Debug mode
- From Drupal 10.2 you can go to Configuration > development > development settings => Enable twig debug mode

- From older versions:
sites/default/services.yml
```yml
parameters:
  twig.config:
    debug: true 
```
  
To print the variables
```twig
dump(variable)
{{ dump(myvar|keys) }}
<pre>{{ dump(myvar|keys) }}</pre>

If you don't know what variable needs to debug
<pre>{{ dump(_context|keys) }}</pre>
```

#### English translatable 
```twig
{% trans %} Hello baby {% endtrans %}

<label>
{% trans with {'context': 'Expreciones', 'langcode': 'es'} %}
Delirante
{% endtrans %}
</label>

<input value="{% trans 'Delirio' with {'context': 'Estados persona', 'langcode': 'es'} %}">
```

#### Retaining module's functionality
```twig
<div{{ attributes }}>
  {{ title_prefix }}{{ title_suffix }}
  {# Also ensure {{ content }}} is rendered #}
</div>

- Where <div> also can be <article> tag
- Content retains important drupal behaviors like cache

{{ content }} or {{ content|without('body', 'field_image')}}

- Take the content of a variable.
{% set cacheSaver = content|render %}
```

### Twig inheritance

| Use Case                | Tag             | Why?                                             |
| ----------------------- | --------------- | ------------------------------------------------ |
| Just include raw markup | `{% include %}` | Simple reuse, no overrides needed                |
| Full layout inheritance | `{% extends %}` | Site-wide base layout                            |
| Partial override reuse  | `{% embed %}`   | Override parts of a reusable template on the fly |


```twig
{% extends "base.html.twig" %}

{% block title %}
  Welcome to the Homepage
{% endblock %}

{% block content %}
  <h2>Featured Articles</h2>
  {{ content }}
{% endblock %}
```

```twig
{% embed "template-to-embed.html.twig" %}
  {% block blockname %}
    Your custom override
  {% endblock %}
{% endembed %}
```
Sources
=================
Comunity documentation
https://www.drupal.org/node/1906392

Official documentation for twig
http://twig.sensiolabs.org/
