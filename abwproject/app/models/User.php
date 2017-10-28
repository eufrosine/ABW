<?php
/**
 * Created by PhpStorm.
 * User: Dwiyan-admin
 * Date: 10/28/17
 * Time: 3:05 PM
 */

class User extends \Phalcon\Mvc\Model
{

    public $username;

    public $user_id;

    public $email;

    public $password;

    public $join_date;

    public function getSource()
    {
        return 'user';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return User[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return User
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }


}