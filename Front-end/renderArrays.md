Render Arrays
========
- Many smaller render array are created throughout the page load process.
- They get combined into "The Render Array" just prior to rendering into HTML
- Generally as a dev you are creating or manipulating one of these smaller chunks and passing it back/appending onto a larger portion.

When to Use What:
| Situation                                        | Use `Render Array` (no Twig) | Use Twig Template |
| ------------------------------------------------ | ----------------------- | ----------------- |
| Static/simple text (e.g. AJAX or admin message)  | ✅                       | ❌                 |
| Complex HTML layout                              | ❌                       | ✅                 |
| Themed output that designers need to touch       | ❌                       | ✅                 |
| Performance-critical CLI output or batch process | ✅                       | ❌                 |
| Custom blocks / pages with design                | ❌                       | ✅                 |


Summary – What’s the Better Render Array Vs Templating
| Method                 | Best Use Case                        |
| ---------------------- | ------------------------------------ |
| `#markup`              | Small, static strings or dev/testing |
| `#theme`               | ✅ Best for theming, clean separation |
| `#inline_template`     | Quick Twig logic (AJAX, test output) |
| `#type => 'container'` | Semantic structure in arrays         |
| `#type => 'html_tag'`  | Safe custom HTML elements            |

#### Format & Structure
- Many! smaller arrays nested many! layers deep => "Arrays of Doom"
- There are made up of
```
# Properties: either the data itself, or information about how it should be displayed.
# Organizing entries: Provide structure, act as a "container" for data/metadata properties.
```

#### Render Array Vs twig

Folder:  /modules/custom/hello_world

hello_world.info.yml
```yml
name: Hello World
type: module
description: 'Displays a Hello World page.'
core_version_requirement: ^10
package: Custom
version: 1.0
````

hello_world.routing.yml
```yaml
hello_world.hello.render_array:
  path: '/hello-world-render-array'
  defaults:
    _controller: '\Drupal\hello_world\Controller\HelloWorldController::helloRenderArray'
    _title: 'Hello World'
  requirements:
    _permission: 'access content'

hello_world.hello.templating:
  path: '/hello-world-templating'
  defaults:
    _controller: '\Drupal\hello_world\Controller\HelloWorldController::helloTemplating'
    _title: 'Hello World'
  requirements:
    _permission: 'access content'

```

src/Controller/HelloWorldController.php
```php
<?php
namespace Drupal\hello_world\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Returns a Hello World message.
 */
class HelloWorldController extends ControllerBase {

  /**
   * Returns a render array.
   */
  public function helloRenderArray() {
    return [
      '#type' => 'html_tag',
      '#tag' => 'span',
      '#value' => 'Hello world!',
      '#attributes' => ['class' => ['highlight']],
      '#cache' => [
        'max-age' => 3600,
        'contexts' => ['url.path'],
        'tags' => ['node:1'],
      ],
      '#attached' => [
      'library' => [
        'hello_world/hello_world_assets',
      ],
    ],
    ];
  }

  /**
   * Display the Hello World message using Twig.
   */
  public function helloTemplating() {
    return [
      '#theme' => 'hello_world_template',
      '#message' => $this->t('Hello World!'),
      '#attached' => [
        'library' => [
          'hello_world/hello_world_assets',
        ],
      ],
    ];
  }

}
```

hello_world.theme
```php
<?php
/**
 * Implements hook_theme().
 */
function hello_world_theme($existing, $type, $theme, $path) {
  return [
    'hello_world_template' => [
      'variables' => ['message' => NULL],
      'template' => 'hello-world', // this matches hello-world.html.twig
    ],
  ];
```

hello_world/templates/hello-world.html.twig
```twig
<div class="hello-world">
  <h1>{{ message }}</h1>
</div>
```

hello_world/hello_world.libraries.yml
```yml
hello_world_assets:
  version: 1.x
  css:
    theme:
      css/hello_world.css: {}
  js:
    js/hello_world.js: {}
  dependencies:
    - core/jquery
```

css/hello_world.css
```css
.hello-world {
  background-color: #f0f8ff;
  padding: 20px;
  border: 2px dashed #339;
  color: #333;
}
```
js/hello_world.js
```js
(function ($, Drupal) {
  Drupal.behaviors.helloWorld = {
    attach: function (context, settings) {
      $('.hello-world', context).once('helloWorld').each(function () {
        console.log('Hello World JS behavior attached!');
        $(this).append('<p>This message is added by JS.</p>');
      });
    }
  };
})(jQuery, Drupal);
```