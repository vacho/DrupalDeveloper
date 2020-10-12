Laanguage negotiation
========

#### Filtro aplicable a un campo para agregar target_blank a todos los enlaces del contenido
```
namespace Drupal\mi_modulo\Plugin\LanguageNegotiation;

use Drupal\language\LanguageNegotiationMethodBase;
use Symfony\Component\HttpFoundation\Request;

/**
 * Custom class for identifying language.
 *
 * @LanguageNegotiation(
 *   id = Drupal\mi_modulo\Plugin\LanguageNegotiation\LanguageNegotiationAnonymous::METHOD_ID,
 *   weight = -99,
 *   name = @Translation("Anonymous Language always English"),
 *   description = @Translation("Language based on anonymous restriction to view always the website an English."),
 * )
 */
class LanguageNegotiationAnonymous extends LanguageNegotiationMethodBase {

  /**
   * The language negotiation method id.
   */
  const METHOD_ID = 'language-anonymous';

  /**
   * {@inheritdoc}
   */
  public function getLangcode(Request $request = NULL) {
    if ($this->currentUser->isAnonymous()) {
      $langcode = 'en';
      return $langcode;
    }
  }

}
```