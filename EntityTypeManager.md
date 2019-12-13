EntityTypeManager
========

#### Servicio para realizar consultas a entidades

Operar sobre el formuario de una entidad
```
protected function getBundleForm($entity_type_id, $bundle, $bundle_label, array $form, FormStateInterface $form_state, $bundle_count) {
    $entityType = $this->entityTypeManager->getDefinition($entity_type_id);
    $entity = $this->entityTypeManager->getStorage($entity_type_id)->create([
      $entityType->getKey('bundle') => $bundle,
    ]);

    if (!isset($form[$entity_type_id])) {
      $form[$entity_type_id] = [
        '#type' => 'container',
        '#tree' => TRUE,
      ];
    }

    // If there is no bundle label, the entity has no bundles.
    if (empty($bundle_label)) {
      $bundle_label = $entityType->getLabel();
    }
    $form[$entity_type_id][$bundle] = [
      '#type' => 'details',
      '#open' => ($bundle_count === 1),
      '#title' => $entityType->getLabel() . ' - ' . $bundle_label,
      '#parents' => [$entity_type_id, $bundle],
    ];

    $form_display = EntityFormDisplay::collectRenderDisplay($entity, 'bulk_edit');
    // Build entity form.
    $form_display->buildForm($entity, $form[$entity_type_id][$bundle], $form_state);
    // Get only the field moderation_state.
    $this->getModerationStateForm($form[$entity_type_id][$bundle]);

    return $form;
  }

  protected function getModerationStateForm(array &$form) {
    $field = 'moderation_state';
    foreach (Element::children($form) as $key) {
      if ($key != $field) {
        unset($form[$key]);
      }
    }
  }

  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    $storage = $form_state->getStorage();
    $bundle_data = $storage['moderation_entity_bundles_data'];
    $field = "name_of_field";
    foreach ($bundle_data as $entity_type_id => $bundles) {
      $entity_type = $this->entityTypeManager->getDefinition($entity_type_id);
      foreach ($bundles as $bundle => $label) {
        $form_clone = $form;
        $form_clone['#parents'] = [$entity_type_id, $bundle];
        $entity = $this->entityTypeManager->getStorage($entity_type_id)->create([
          $entity_type->getKey('bundle') => $bundle,
        ]);
        $form_display = EntityFormDisplay::collectRenderDisplay($entity, 'bulk_edit');
        // Extract form values into $entity.
        $form_display->extractFormValues($entity, $form_clone, $form_state);
        $this->configuration[$entity_type_id][$bundle][$field] = $entity->{$field}->getValue();
      }
    }
    $this->configuration['_add_values'] = $form_state->getValue('_add_values');
  }
```

ENLACES Y FUENTES
=================
Documentación oficial
https://api.drupal.org/api/drupal/8

Documentación de la comunidad
https://www.drupal.org/developing/api/8
