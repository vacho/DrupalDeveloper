Consultas
===

#### Consultas mediante sql
```
$db = \Drupal::database();

//Método 1
$query = $db->select('k_product', 'p');
$query->fields('p', ['idpr', 'name', 'type']);
$data = $query->execute()->fetchAllAssoc('idpr', 'name', 'type');

//Método 2
// Dado:
$sql = "SELECT idpr, name, code, detail FROM k_product";
// Obtener un array asociativo simple
$data = $db->query($sql)->fetchAll(\PDO::FETCH_ASSOC);
// Obtener un array asociativo. Con 'idpr' como identificador de cada subarray asociativo 
$data = $db->query($sql)->fetchAllAssoc('idpr', 'FETCH_ASSOC');

// Obtener sólo un dato puntual
$sql = "SELECT idpr FROM k_product WHERE name = :name;";
$id_product = $db->query($sql, array(':name' => 'Lapiz'))->fetchField(0);

DEPRECADOS.
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
$addFactor =  db_query('SELECT value FROM k_factor WHERE id = :id;', array(':id' => $id))->fetchField();
```
