SDC
========

Single Directory Component is indtroduced for Drupal 10.1

- Enable the module "Single Directory Components"
- Components placed in ThemName/components/name
- Component "inputs" defined within YML file.
- Styling is auto-loaded.
- Use MODULE_OR_THEME:COMPONENT instead of path to twig:
{% include 'ThemeName:ComponentName' %}