<?php

require_once("Model.php");

class Model_users extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    /*
    getDeliveryPersons - help function.
    select query to all delivery persons.
    */
    public function getDeliveryPersonsHelp($account_id)
    {
        $clients = $this->getDB()
                        ->query("SELECT * FROM  users WHERE account_id=$account_id")
                        ->fetch_all(MYSQLI_ASSOC);
        return $clients;
    }
}
