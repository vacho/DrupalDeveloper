Javascript
========

# Drupal behaviors and attach method
- Drupal.behaviours is an object inside Javascript structure in Drupal, which allows us to attach functions to be executed at certain times during the execution of the application.
- Drupal.behaviours is called when the DOM is fully loaded, but these behaviours can be called again.
- Drupal documentations suggest that modules should implement Javascript by attaching logic to Drupal.behaviours.

### Why do we need Drupal behaviors
- They are automatically re-applied to any content that is loaded through AJAX.
- The can be called anytime whith a context that represents new additions or changes to the DOM.
- This is better than $(document).ready() or document.DOMContentLoaded where the code is just run once.

### When is Drupal behaviors unwanted?
- When need to execute some code which does not affect the DOM. Eg: init an external script like google analytics.
- When some js operation needs to be performed on the DOM just once, knowing that the element will be available when page loads. (This scenario is different form using Once)

### When is Drupal behaviors callend
- After an administration overlay has been loaded into the page.
- After the AJAX Form API has submitted a form.
- When an AJAX request return a command that modifies the HTML, such as ajax_command_replace().
- CTools calls it after a modal has been loaded.
- Media calls it after the media browser has been loaded.
- Panels calls it after in-place editing has beend completed.
- Views calls it after loading a new page that uses AJAX.
- Views Load More calls it after loading the next chunk of items.
- JavaScript from custom modules may call Drupal.attachBehaviors() when they add or change parts of the page.


# Context
- When calling the attach method for all behaviors, Drupal passes along a context variable.
- The context variable that is passed often give a better idea of what DOM element is being processed.
- During the initial page load this will be the complete HTMLDocument; during subsequent calls this will be just the elements that are being added to the page

# Once
- Once ensures that something is processed only once by adding a data-once attribute in a DOM element after the code has been executed.
- If the behavior is called again, the element with the data-once attribute is skipped for further execution.
- Once is modern implementation of jQuery.once (which is an endeavour to move away from jQuery)

Example with mange a click event.
```js
(function (Drupal, once) {
 Drupal.behaviors.exampleBehaviour3 = {
   attach: (context, settings) => {
     once("food-header-initialized", ".food-list-header", context).forEach(
       (header) => {
         let greatFoodSpan = document.createElement("span");
         greatFoodSpan.textContent = "Get ready for great ood!!!!!!";
         header.append(greatFoodSpan);
       }
     );
     once("food-initialized", ".views-row", context).forEach((food) => {
       food.addEventListener("click", () => {
         let foodCounter = food.querySelector(".food-click-counter");
         let timesClicked = parseInt(foodCounter.textContent.trim());
         foodCounter.textContent = ++timesClicked;
       });
     });
   },
 };
})(Drupal, once);
```
# Detach method
- This acts removing whatever we did in attach method.
- Any code in the detach method wil be called whenever content is removed form the DOM.
- This helps us to clean our application. Eg: enables us to remove unwanted even listners which consume resources.
js example
```js
(function (Drupal, once) {
 let counter = 0;
 let intervalStopper;
 Drupal.behaviors.exampleBehaviour4 = {
   attach: (context, settings) => {
     // Set the timer for user to see the time elapsed
     once("timer-initialized", ".contact-timer", context).forEach((ele) => {
       const timer = context.querySelector(".contact-timer-sec");
       timer.textContent = counter;
       intervalStopper = setInterval(() => {
         const timer = document.querySelector(".contact-timer-sec");
         timer.textContent = ++counter;
         console.log("This is logging");
       }, 1000);
     });
   },
   // Clear the timer on confirmation
   detach: (context, settings, trigger) => {
     const timer = context.querySelector(".contact-timer-sec");
     if (trigger == "unload" && timer) {
       clearInterval(intervalStopper);
     }
   },
 };
})(Drupal, once);
```

### IIFE
Immediately Invoked Function Expressions
- We have been using IIFE to write our Drupal code.
- The initial opening helps prevent the function's scope from polluting the global scope of the entire application.
- You can pass arguments to your anonymous function by including them as arguments at the end of the function definition.




# Example displaying from a block
my_module/hello.libraries.yml
```yml
hello_world:
  version: 1.x
  js:
    js/hello.js: {}
  dependencies:
    - core/drupal
    - code/once
```

my_module/src/Plugin/Block/HelloWorldBlock.php
```php
<?php

namespace Drupal\hello_world\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a Hello World block.
 *
 * @Block(
 *   id = "hello_world_block",
 *   admin_label = @Translation("Hello World Block")
 * )
 */
class HelloWorldBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#markup' => '<div class="hello-world-target"></div>',
      '#attached' => [
        'library' => [
          'hello_world/hello_world',
        ],
      ],
    ];
  }
}
```

js/hello.js
```js
(function (Drupal, once) {
  Drupal.behaviors.helloWorldBehavior = {
    attach: function (context, settings) {
      once('hello-world', '.hello-world-target', context).forEach(function (element) {
        const message = document.createElement('p');
        message.textContent = 'Hello World from Drupal.behaviors!';
        message.classList.add('hello-world-message');
        element.appendChild(message);
      });
    }
  };
})(Drupal, once);
```
# Example displaying MVC

hello.routing.yml
```yml
hello_worl.hello:
path: '/hello'
defaults:
  _controller: '\Drupal\hello_world\Controller\HelloWorldController::hello'
  _title: 'Hello World'
requirements:
  _permission: 'access content'
```

js/hello.js
```js
(function (Drupal, once) {
  Drupal.behaviors.helloWorldBehavior = {
    attach: function (context, settings) {
      once('hello-world', '.hello-world-target', context).forEach(function (element) {
        element.innerHTML = '<p class="hello-js">Hello World from JavaScript via Drupal.behaviors!</p>';
      });
    }
  };
})(Drupal, once);
```
src/Controller/HelloWorldController.php
```php
<?php

namespace Drupal\hello_world_mvc\Controller;

use Drupal\Core\Controller\ControllerBase;

class HelloWorldController extends ControllerBase {

  public function hello() {
    return [
      '#theme' => 'hello_world',
      '#attached' => [
        'library' => [
          'hello/hello_world',
        ],
      ],
    ];
  }

}
```

templates/hello-world.html.twig
```twig
<div class="hello-world-target"></div>
```

hello_world.theme
```php
<?php

/**
 * Implements hook_theme().
 */
function hello_world_mvc_theme($existing, $type, $theme, $path) {
  return [
    'hello_world' => [
      'render element' => 'elements',
      'template' => 'hello-world',
    ],
  ];
}
```

**context**: The part of the DOM that this behavior is being applied to.
```js
conext.querySelector(".demo");
```

**settings**: A JS object with configuration data coming from:
- Drupal core
- Modules
- Themes
- Or custom values set using drupalSettings in PHP
php file
```php
use Drupal\Core\Render\AttachmentsInterface;

$build['#attached']['drupalSettings']['myModule'] = [
  'foo' => 'bar',
];
```
js file
```js
console.log(settings.myModule.foo); // outputs 'bar'

```

Sources
=================

Javascript coding standards
- https://www.drupal.org/node/172169

Blog that explain js wai for Drupal
- https://www.specbee.com/blogs/taming-javascript-in-drupal
- https://www.youtube.com/watch?v=72f35d9BKFY&t=193s