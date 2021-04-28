PDF
========

#### Generar archivo PDF

```php
use Dompdf\Dompdf;
use Drupal\Core\Link;
use Drupal\Core\Url;


/** @var \Drupal\Core\Template\TwigEnvironment $twig */
$twig = \Drupal::service('twig');
$dompdf = new Dompdf();
$url = \Drupal::request()->getSchemeAndHttpHost();

// Predefinimos el destino del archivo para acceso público.
$wrapper = 'public';
$rand = substr(hash('ripemd160', uniqid()), 0, 8);
$filename = 'nombre_del_archivo'. '-' . $rand . '.' . 'pdf';
$destination = $wrapper . '://' . $filename;

$dompdf->loadHtml($twig->render('@nombre_modulo_theme/folder_del_template/nombre_template.html.twig', [
  'parametro_1_para_twig' => 'valor_1',
  'parametro_3_para_twig' => 'valor_2',
]));
$dompdf->render();

sendToFileWithPredestination($dompdf->output(), $destination);

function sendToFileWithPredestination(string $output, string $destination) {
  if (!empty($output) && !empty($destination)) {
    $file = file_save_data($output, $destination, FileSystemInterface::EXISTS_REPLACE);
    $file->setTemporary();
    $file->save();

    // Si fuese nesecario sacar un enlace al archivo.
    $file_url = Url::fromUri(
    file_create_url($file->getFileUri()),
    [
        'attributes' => ['target' => '_blank'],
        'absolute' => TRUE,
    ]
    );
    $link = Link::fromTextAndUrl($this->t('Click here'), $file_url);
    $this->messenger()->addStatus($this->t('Export file created, @link to download.', ['@link' => $link->toString()]));
  }
}
```
