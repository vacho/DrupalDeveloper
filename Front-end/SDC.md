SDC
========

Single Directory Component is indtroduced for Drupal 10.1

- Makes theming modular and cleaner.
- Encourages component reuse.
- Easier to maintain styles and behaviors tied to a single Twig file.
- Encourages frontend/backend collaboration through encapsulated components.

Tips:
- Your components must be inside a components/ directory in your theme or module.
- card.component.yml is what makes it "discoverable" by Drupal.
- SDCs must be enabled in Drupal via the "Single Directory Components" module (enable it).
- Consider using theme: card in your render array to render as a theme component.

# Example
Folder structure
```swift
/themes/custom/mytheme/components/card/
├── card.component.yml
├── card.html.twig
├── card.css
└── card.js
```

# 1 card.component.yml
```yml
id: card
label: Card
status: true
```
# 2. card.html.twig — The Template
```twig
<div class="card">
  {% if image %}
    <img src="{{ image }}" alt="{{ title }}" />
  {% endif %}
  <h2>{{ title }}</h2>
  <p>{{ content }}</p>
</div>
```
# 3. card.css
```css
.card {
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
```

# 4. card.js
```js
console.log('Card component loaded!');
```

# Enabling SDC in your theme
```yml
type: theme
name: My Theme
core_version_requirement: ^10
base theme: classy

component libraries:
  - components
```

# 5. register the components in  mytheme.libraries.yml:
```yml
components:
  css:
    component:
      components/**/*.css: {}
  js:
    components/**/*.js: {}
```

# Using the component in Drupal Render Array
```php
return [
  '#theme' => 'card',
  '#title' => 'My Card Title',
  '#content' => 'This is the content of the card.',
  '#image' => '/themes/custom/mytheme/images/example.jpg',
];
```
# Using the component in Twig
```twig
{{ attach_library('mytheme/components') }}
{% include "@mytheme/card/card.html.twig" with {
  title: 'Card title',
  content: 'Hello',
  image: '/path/to/image.jpg'
} %}
```


