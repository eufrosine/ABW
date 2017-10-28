<?php
/**
 * Created by PhpStorm.
 * User: HermawanRahmatHidaya
 * Date: 18/08/2016
 * Time: 23.36
 */

use Phalcon\Mvc\User\Component;

class HeaderElements extends Component{
    private $_headerMenu = array(
        'navbar-left' => array(
            'index' => array(
                'caption' => 'Home',
                'action' => 'index'
            ),
        ),
        'navbar-right' => array(
            'session' => array(
                'caption' => 'Log In',
                'action' => 'index'
            ),
        )
    );


    /**
     * Builds header menu with left and right items
     *
     * @return string
     */
    public function getMenu()
    {
        $auth = $this->session->get('authentication');
        if ($auth) {
            $this->_headerMenu['navbar-right']['session'] = array(
                'caption' => $auth["name"] . " (Log Out)",
                'action' => 'end'
            );
        } else {
            unset($this->_headerMenu['navbar-left']['dashboard']);
        }

        $controllerName = $this->router->getControllerName();
        foreach ($this->_headerMenu as $position => $menu) {
            echo '<div class="nav-collapse">';
            echo '<ul class="nav navbar-nav ', $position, '">';
            foreach ($menu as $controller => $option) {
                if ($controllerName == $controller) {
                    echo '<li class="active">';
                } else {
                    echo '<li>';
                }
                echo $this->tag->linkTo($controller . '/' . $option['action'], $option['caption']);
                echo '</li>';
            }
            echo '</ul>';
            echo '</div>';
        }

    }

}