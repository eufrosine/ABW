<?php

use \Phalcon\Mvc\Router;

$router = new Router(true);

$router->addGet("/api", array("controller"=>"presence", "action"=>"index"));

return $router;