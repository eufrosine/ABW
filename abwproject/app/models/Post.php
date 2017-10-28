<?php
/**
 * Created by PhpStorm.
 * User: Dwiyan-admin
 * Date: 10/28/17
 * Time: 3:09 PM
 */

class Post extends \Phalcon\Mvc\Model
{
    public $user_id;

    public $post_id;

    public $post_date;

    public $post_title;

    public $post_text;

    public $post_link;

    public function getSource()
    {
        return 'post';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Post[]
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Post
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }





}