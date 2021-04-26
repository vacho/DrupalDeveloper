API codigo
========

Cambiar el orden en que un módulo se implementa y sus hooks
```php
// colocar en hook_install()
module_set_weight('my_module', 123);
```