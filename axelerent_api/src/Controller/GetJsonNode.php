<?php

/**
 * @file
 * Contains \Drupal\axelerent_api\Controller\GetJsonNode.
 */

namespace Drupal\axelerent_api\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\Core\Controller\ControllerBase;

/**
 * Class GetJsonNode.
 *
 * @package Drupal\axelerent_api\Controller
 */
class GetJsonNode extends ControllerBase {
  /**
   * Parsejsonnode.
   *
   * @return string
   *   Return Hello string.
   */
  public function parsejsonnode($param_1, $param_2) {
	$config = \Drupal::service('config.factory')->getEditable('system.site');
	$node_storage = \Drupal::entityManager()->getStorage('node');
	$node = $node_storage->load($param_2);
	if(isset($node)) 
	$n = array('title' => $node->getTitle(), 'body' => $node->get('body')->value, 'type' => $node->getType());
	if($param_1 == $config->get('siteapikey') && isset($node) && $node->getType() == "page")
		return new JsonResponse($n);
	  else
		  throw new \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException();
  }
}
