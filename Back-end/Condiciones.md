Condiciones
========
Las condiciones se puede agregar en cualquier campo que lo requiera (panels, commerce cart, descuentos, bloques condicionales etc)

#### Ejemplo condición extendida de base (usable desde commerce conditions)
```php
namespace Drupal\extended_commerce\Plugin\Commerce\Condition;

use Drupal\commerce\Plugin\Commerce\Condition\ConditionBase;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a basic condition for orders.
 *
 * @CommerceCondition(
 *   id = "custom_module_order_specific_customer",
 *   label = @Translation("Specific customer"),
 *   category = @Translation("Customer"),
 *   entity_type = "commerce_order",
 * )
 */
class OrderSpecificCustomer extends ConditionBase {

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
        'customer' => NULL,
      ] + parent::defaultConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildConfigurationForm($form, $form_state);

    $form['customer'] = [
      '#type' => 'textfield',
      '#default_value' => $this->configuration['customer'],
      '#required' => TRUE,
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    parent::submitConfigurationForm($form, $form_state);

    $values = $form_state->getValue($form['#parents']);
    $this->configuration['customer'] = $values['customer'];
  }

  /**
   * {@inheritdoc}
   */
  public function evaluate(EntityInterface $entity) {
    $this->assertEntity($entity);
    /** @var \Drupal\commerce_order\Entity\OrderInterface $order */
    if ($customer_id = $order->getCustomerId()) {
      // Condition is TRUE only for customer with ID #2.
      return ($customer_id == $this->configuration['customer']);
    }

    return FALSE;
  }

}
```
#### Ejemplo condición extendida de plugin base (usable desde panels, etc)
```php
<?php

namespace Drupal\field_mode\Plugin\Condition;

use Drupal\Core\Condition\ConditionPluginBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a 'Viewing custom_field node' condition.
 *
 * @Condition(
 *   id = "viewing_field_node",
 *   label = @Translation("Viewing field node")
 * )
 */
class ViewingFieldNode extends ConditionPluginBase implements ContainerFactoryPluginInterface {

  /**
   * The currently active route match object.
   *
   * @var \Drupal\Core\Routing\RouteMatchInterface
   */
  protected $currentRouteMatch;

  /**
   * Creates a new ViewingCrisisNode instance.
   *
   * @param array $configuration
   *   The plugin configuration, i.e. an array with configuration values keyed
   *   by configuration option name. The special key 'context' may be used to
   *   initialize the defined contexts by setting it to an array of context
   *   values keyed by context names.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Routing\RouteMatchInterface $current_route_match
   *   The currently active route match object.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, RouteMatchInterface $current_route_match) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->currentRouteMatch = $current_route_match;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('current_route_match')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form['status_text'] = [
      '#type' => 'markup',
      '#markup' => $this->t('Node with custom_field status field <b>is being viewed</b>'),
    ];

    return parent::buildConfigurationForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function summary() {
    return ($this->isNegated())
      ? $this->t('Node with custom_field status field <b>is not being viewed</b>')
      : $this->t('Node with custom_field status field <b>is being viewed</b>');
  }

  /**
   * {@inheritdoc}
   */
  public function evaluate() {
    $node = $this->currentRouteMatch->getParameter('node');
    return ($node && $node->hasField('custom_field') && $node->custom_field->value);
  }

}
```



ENLACES Y FUENTES
=================
Colección de condition plugins
- https://www.drupal.org/project/condition_plugins

