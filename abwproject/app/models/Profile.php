<?php
/**
 * Created by PhpStorm.
 * User: Dwiyan-admin
 * Date: 10/28/17
 * Time: 3:36 PM
 */

class Profile extends \Phalcon\Mvc\Model
{

    public $user_id;

    public $username;

    public $profile_name;

    public $profile_country;

    public $birthday;

    public $profile_link;

    public function getSource()
    {
        return 'profile';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Profile[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Profile
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }



}