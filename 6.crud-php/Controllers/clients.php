<?php

require_once('controller.php');

class clients extends controller
{
    public $model_cls = "clients";
    public function __construct()
    {
        parent::__construct();
    }

    /*
    This function gets a specific client.
    */
    public function getClient()
    {
        $id = $this->data->id;
        $client = $this->model->getClientHelp($id);
        $this->response["client"] = $client;
        return $this->response;
    }

    /*
    This function gets all the clients.
    */
    public function getClients()
    {
        $account_id = $this->data->account_id;
        $clients = $this->model->getClientsHelp($account_id);
        $this->response["clients"] = $clients;
        return $this->response;
    }

    /*
    This function adds a new client to clients table.
    */
    public function addClient()
    {
        $first_name = $this->data->form->first_name;
        $last_name = $this->data->form->last_name;
        $phone_number = $this->data->form->phone;
        $email_address = $this->data->form->email;
        $address = $this->data->form->address;
        $account_id = $this->data->form->account_id;

        $isInvalid = $this->model->validate($first_name, $last_name, $phone_number, $email_address, $address, $account_id);

        if(count($isInvalid) === 0)
        {
            $insert = $this->model->addClientHelp($first_name, $last_name, $phone_number, $email_address, $address, $account_id);
            if(!$insert)
            {
                array_push($isInvalid, "exist"); 
                return $isInvalid;   
            }
        }
        return $isInvalid;
    }

    /*
    This function remove client from clients table.
    */
    public function removeClient()
    {
        $id = $this->data->id;

        $remove = $this->model->removeClientHelp($id);
        $this->response = $remove;
        return $this->response;
    }

        /*
    This function adds a new client to clients table.
    */
    public function updateClient()
    {
        $first_name = $this->data->form->first_name;
        $last_name = $this->data->form->last_name;
        $phone_number = $this->data->form->phone;
        $email_address = $this->data->form->email;
        $address = $this->data->form->address;
        $id = $this->data->form->id;

        $isInvalid = $this->model->validate($first_name, $last_name, $phone_number, $email_address, $address);

        if(count($isInvalid) === 0)
        {
            $update = $this->model->updateClientHelp($first_name, $last_name, $phone_number, $email_address, $address, $id);
            if(!$update)
            {
                array_push($isInvalid, "exist"); 
                return $isInvalid;   
            }
        }
        return $isInvalid;
    }
}
