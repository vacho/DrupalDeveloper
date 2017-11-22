REST
========

#### Generación mediante la consola
```
// Genera la clase que permite gestionar un servicio mediante los métodos GET, PUT, POST, DELETE, PATCH, HEAD, OPTIONS
$ drupal generate:plugin:rest:resource
Cuando pida 'Enter the plugin rest resource url' se puede poner /ruta/{parametros}
```

### Habilitar el recurso
```
Instalar el módulo REST UI
https://www.drupal.org/project/restui

- Habilitar el recurso.
/admin/config/services/rest

- Activar privilegios para los roles indicados.
/admin/people/permissions
```

### Acceder al recurso
```
Por URL
/dblog/1?_format=json

Usando postman

```

### Ejemplo conexión uso rest post desde Python
```
import requests
import json

user_khipu = "algun_usuario"
pass_khipu = "alguna_clave"
url_base = 'http://www.misitio.com'

# Logueo en drupal. El logueo se debe realizar una sola vez, luego con esta sesión se debe realizar las operaciones.
user_datas = {"name":user_khipu,"pass":pass_khipu}
data_json = json.dumps(user_datas)
response_login = requests.post(url_base + '/user/login?_format=json', data=data_json)
data_result = json.loads(response_login.text)
csrf_token = data_result['csrf_token']
# Ejemplo csrf_token = 'fcZ8bTiCqxqsDVORnDjJoLRDFWQwCPHX7Qjpxg7hbNA'


# Enviar un json para registro mediante post
data = {
    "voucher":
        {
            "class":"normal",
            "date":1508891700,
            "gloss":"Asiento de prueba",
            "type":"INCOME",
            "entry_subtype":"PAYMENT",
            "state":"REGISTERED"
        }
}
data_json = json.dumps(data)
header = {'Content-Type':'application/json','X-CSRF-Token':csrf_token}

client = requests.session()
client.headers.update(header)
client.auth = (user_khipu,pass_khipu)

response_post = client.post(url_base + '/url_al_servicio_post?_format=json', data=data_json)
print (response_post.text)
```


#### Referencias
```
Ejmplo con GET y POST
https://github.com/DrupalBolivia/RESTFul-web-services/blob/master/rest_example/src/Plugin/rest/resource/RestExampleResource.php

Documentación
https://www.drupal.org/docs/8/api/restful-web-services-api/restful-web-services-api-overview
```

