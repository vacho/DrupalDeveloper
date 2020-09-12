<?php

namespace Drupal\drupal_vuejs\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Returns responses for drupal vuejs routes.
 */
class drupalVuejsController extends ControllerBase {

  /**
   * Builds the response whit twigs.
   */
  public function testContent() {
  
    $content = [
      '#theme' => 'twigTest',
      '#test_var' => $this->t('Example of a page'),
      '#test_var2' => $this->t('implemented with Vuejs'),
      '#attached' => [
        'library' => [
          'drupal_vuejs/vuejs',
          'drupal_vuejs/appvuejs',
        ]
      ],
      '#cache' => array(
        'max-age' => 0,
      ),
    ];
    
    return $content;
  }

}
