<?php

namespace Drupal\jugaad_product\Plugin\Block;


use Drupal\Core\Block\BlockBase;


/**
 * Provides a 'Jugaad Product' block.
 *
 * @Block(
 *  id = "jugaadproduct",
 *  admin_label = @Translation("Jugaad product purchase"),
 * )
 */
class JugaadProductBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $node = \Drupal::routeMatch()->getParameter('node');
    $access = false;
    $typeLabel = "";
    $pathh = "";
    $typeName = "";
    if(isset($node)) {
    $pathh = $node->toUrl()->setAbsolute()->toString();
    $typeName = $node->bundle();
    $typeLabel = $node->getTitle();
    }
    return array(
      '#markup' => '<img src="https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl='.$pathh.'&choe=UTF-8" title="'.$typeLabel.'" />',
      '#cache' => array(
        'max-age' => 0,
      ),  
    );
  }
}
