<?php

use Phalcon\Mvc\Controller;

class ControllerBase extends Controller
{
    private $people = array();
    private $directors = array();
    private $lecturers = array();
    private $staffs = array();
    private $students = array();
    private $rooms = array();

    public function initialize(){
        date_default_timezone_set('Asia/Jakarta');
        $this->tag->prependTitle('Travel Site | ');

    }

    protected function forward($uri)
    {
        $uriParts = explode('/', $uri);
        $params = array_slice($uriParts, 2);
        return $this->dispatcher->forward(
            array(
                'controller' => $uriParts[0],
                'action' => $uriParts[1],
                'params' => $params
            )
        );
    }

    protected function mustLogin(){
        if($this->session->get("authentication")!=null){
            return true;
        }else{
            $this->flash->error("You are not authenticated");
            $this->forward("session/index");
            return false;
        }
    }


}
