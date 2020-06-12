ARCHIVOS
========

#### Escribir en un archivo
```
  $file = File::create([
    'uid' => 1,
    'filename' => 'nombre_archivo.txt',
    'uri' => 'public://page/nombre_archivo.txt',
    'status' => 1,
  ]);
  $file->save();
  $dir = dirname($file->getFileUri());
  if (!file_exists($dir)) {
    mkdir($dir, 0770, TRUE);
  }
  file_put_contents($file->getFileUri(), $content);
  $file->save();
```

#### Referencias
http://www.drupal8.ovh/en/tutoriels/47/create-a-file-drupal-8
