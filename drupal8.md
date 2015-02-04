DRUPAL 8
========

#### Consultas mediante sql
```
//múltiples filas
$result = db_query('SELECT id, qualifier, email, board, popup
          FROM {k_message}
          WHERE rule = :rid',
          array(':rid' => $idRule)
);

foreach ($result as $record) {
  $idMessage = $record->id;
  $qualifier = $record->qualifier;
  $emailMsg = $record->email;
  $boardMsg = $record->board;
  $popupMsg = $record->popup;
}
 
//optener valor de un sólo campo
$addFactor =  db_query('SELECT value FROM k_factor WHERE id = 1;')->fetchField();
```

#### Consultas mediante Entidades

```
//crear entidad
$voucher =  array(
  'iden' => $_SESSION['entity']['id'],
  'idam' => 1, //to do: set dinamic this value
  'number' => NUll, //entity has a presave()
  'date' => $form_state->getValue('date'),
  'description' => $form_state->getValue('gloss'),
  'type' => $form_state->getValue('type'),
  'subtype' => NULL,
  'amount' => NULL,
  'state' => "REGISTERED",
  'userid' => \Drupal::currentUser()->id(),
);
      
$entityVoucher = entity_create('k_voucher', $voucher);
$entityVoucher->Save();
$idVoucher = $entityVoucher->id();

//obtener una entidad mediante consulta
$idsAccountPlan = \Drupal::entityQuery('k_accountplan')
->condition('iden', $entity, '=')
->condition('idac', $account->getIdac(), '=')
->condition('idam', $accountingManagement, '=')
->execute();
$accountPlan = AccountPlan::load(reset($idsAccountPlan));

//obtener multiples entidades mediante consulta
$idsEntries = \Drupal::entityQuery('k_accountingentry')
->condition('idvo', $voucher->getIdvo(), '=')
->execute();
$entries = AccountingEntry::loadMultiple($idsEntries);
foreach ($entries as $entrie) {
 ... hacer algo con las entidades ...
}
      
//obtener datos de entidades foraneas
$entity->idac->target_id;
$entity->idac->entity->label();
      
//obtner valor de un atributo de la entidad
$rule->get('variable')->value
