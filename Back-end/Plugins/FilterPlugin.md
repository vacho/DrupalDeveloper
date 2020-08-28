FilterPlugin
========

#### Filtro aplicable a un campo para agregar target_blank a todos los enlaces del contenido
```
namespace Drupal\mi_modulo\Plugin\Filter;

use Drupal\Component\Utility\Html;
use Drupal\filter\FilterProcessResult;
use Drupal\filter\Plugin\FilterBase;
use Drupal\Core\Url;

/**
 * Provides a ExternalLinkFilter filter.
 *
 * @Filter(
 *   id = "external_link",
 *   title = @Translation("External links processor"),
 *   description = @Translation("Updates links with neccessary attribute."),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_TRANSFORM_REVERSIBLE
 * )
 */
class ExternalLinkFilter extends FilterBase {

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    $result = new FilterProcessResult($text);
    if (strpos($text, 'href=') !== FALSE) {
      $dom = Html::load($text);
      $xpath = new \DOMXPath($dom);
      foreach ($xpath->query('//a[@href]') as $element) {
        $link_uri = $element->getAttribute('href');
        if ($link_uri == '<front>') {
          $link_uri = Url::fromRoute('<front>')->toString();
          $element->setAttribute('href', $link_uri);
        }
        else {
          $base_uri = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'];
          if (str_contains($link_uri, $base_uri) === FALSE) {
            $element->setAttribute('target', '_blank');
            $element->setAttribute('rel', 'noopener');
          }
        }
      }
      $result->setProcessedText(Html::serialize($dom));
    }

    return $result;
  }

}
```
