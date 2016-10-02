SERVICIOS
========

#### Acceder a un servicio
```
  $my_service = \Drupal::service('my_service_name');
  
  // Dentro un controlador se puede acceder mediante su contenedor
  class MyController extends ControllerBase {
    public function myMethod() {
      $container = $this->container();
      $my_service = $container->get('my_service_name');
    }
  }
  
  // Llamando a los métodos estáticos de la clase Drupal para acceder a algunos servicios
  \Drupal::entityManager();
  \Drupal::database();
  \Drupal::urlGenerator();
  \Drupal::translation();
```
#### Inyectar servicios
```
  // en desarrollo
```

CREAR SERVICIOS
===

#### Ruta
En services.yml
```
services:
  mymodule.myservice:
    class: Drupal\my_module\MyService
    arguments: ['@entity.query']
```
#### Clase
En services.yml
```
  class MyService {
    protected $entityQuery;

    public function __construct(QueryFactory $entity_query) {
      $this->entityQuery = $entity_query;
    }
  }
```


#### Referencias
Cheatsheet https://cryptic.zone/blog/drupal-8-cheatsheet-developers
