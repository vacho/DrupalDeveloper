SDC Single Directory Components
========

SDC in Drupal is a new way to define, organize, and render UI components — where everything related to a component (Twig, CSS, JS, YAML, etc.) lives in a single folder.

It’s similar in spirit to component-based frameworks like React, Vue, or Svelte, but tailored for Twig + Drupal.

#### Folder structure
```
themes/custom/my_theme/components/card/
│
├── card.twig             # Template
├── card.component.yml    # Metadata/config
├── card.css              # CSS for the component
├── card.js               # (Optional) JS behavior
└── card.stories.yml      # (Optional) Storybook inte
```

#### Files

card.component.yml
```yml
id: card
label: 'Card component'
status: true
template: card.twig
libraries:
  - my_theme/card
```

You must enable component support in your theme’s .info.yml file:
```yml
component-libraries:
  my_theme:
    paths:
      - components
```

Render component via Twig like:
```twig
{{ attach_library('my_theme/card') }}
{{ render_component('card', {
  title: 'Hello',
  body: 'This is a card.'
}) }}
```

Sources
=================
https://www.drupal.org/project/sdc