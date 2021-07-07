<?php

require_once("Model.php");

class Model_clients extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    /*
    getClient - help function.
    select query to a specific clients.
    */
    public function getClientHelp($id)
    {
        $client = $this->getDB()
                        ->query("SELECT * FROM  clients WHERE id=$id")
                        ->fetch_all(MYSQLI_ASSOC);
        return $client;
    }

    /*
    getClients - help function.
    select query to all clients.
    */
    public function getClientsHelp($account_id)
    {
        $clients = $this->getDB()
                        ->query("SELECT * FROM  clients WHERE account_id=$account_id")
                        ->fetch_all(MYSQLI_ASSOC);
        return $clients;
    }

    /*
    addClient - help function.
    inserts to db the new client.
    */
    public function addClientHelp($first_name, $last_name, $phone_number, $email_address, $address, $account_id)
    {
        $insert = $this->getDB()
                       ->query("INSERT INTO clients (first_name, last_name, phone_number, email_address, address, account_id) VALUES ('$first_name', '$last_name', '$phone_number', '$email_address', '$address', '$account_id')");
        if(!$insert)
        {
            return false;
        }
        return true;
    }

    /*
    removeClient - help function.
    delete client from db.
    */
    public function removeClientHelp($id)
    {
        $remove = $this->getDB()->query("DELETE FROM clients WHERE id = '$id'");
        if(!$remove)
        {
            return $this->getDB()->error;
        }
        return "query succeeded";
    }

    /*
    updateClient - help function.
    update a client in db.
    */
    public function updateClientHelp($first_name, $last_name, $phone_number, $email_address, $address, $id)
    {
        $update = $this->getDB()
                       ->query("UPDATE clients SET first_name='$first_name', last_name='$last_name', phone_number='$phone_number', email_address='$email_address', address='$address' WHERE id=$id");
        return $update;
    }

    public function validate($first_name, $last_name, $phone_number, $email_address, $address)
    {
        $invalidInputs = array();
        $phoneRegex = "/^05\d([-]{0,1})\d{7}$/"; //phone Regex.
        $emailRegex = "/^([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/"; //email Regex.
      
        if(!strlen($first_name)) array_push($invalidInputs, "first_name");   
        if(!strlen($last_name)) array_push($invalidInputs, "last_name");   
        if(!strlen($address)) array_push($invalidInputs, "address");   
        if (!preg_match($phoneRegex, $phone_number)) array_push($invalidInputs, "phone");
        if (!preg_match($emailRegex, $email_address)) array_push($invalidInputs, "email");   
        
        return $invalidInputs;
    }
}
