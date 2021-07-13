<?php

require_once('controller.php');

class orders extends controller
{
    public $model_cls = "orders";
    public function __construct()
    {
        parent::__construct();
    }

    /*
    This function gets all the products.
    */
    public function getMenu()
    {
        $account_id = $this->data->account_id;
        $menu = $this->model->getMenuHelp($account_id);
        $this->response["menu"] = $menu;
        return $this->response;
    }

    /*
    This function gets all the orders.
    */
    public function getOrders()
    {
        $account_id = $this->data->account_id;
        $orders = $this->model->getOrdersHelp($account_id);
        $this->response["orders"] = $orders;
        return $this->response;
    }

    /*
    This function adds a new order to orders table.
    */
    public function addOrder()
    {
        $account_id = $this->data->form->account_id;
        $client_id = $this->data->form->client_id;
        $delivery_person_id = $this->data->form->delivery_person_id;
        $date = $this->data->form->date;
        $products = $this->data->form->products;
        
        $insert = $this->model->addOrderHelp($client_id, $delivery_person_id, $date, $account_id, $products);
        return $insert;
    }

    /*
    This function remove order from clients table.
    */
    public function removeOrder()
    {
        $id = $this->data->id;

        $remove = $this->model->removeOrderHelp($id);
        $this->response = $remove;
        return $this->response;
    }

    //     /*
    // This function adds a new client to clients table.
    // */
    // public function updateClient()
    // {
    //     $first_name = $this->data->form->first_name;
    //     $last_name = $this->data->form->last_name;
    //     $phone_number = $this->data->form->phone;
    //     $email_address = $this->data->form->email;
    //     $address = $this->data->form->address;
    //     $id = $this->data->form->id;

    //     $isInvalid = $this->model->validate($first_name, $last_name, $phone_number, $email_address, $address);

    //     if(count($isInvalid) === 0)
    //     {
    //         $update = $this->model->updateClientHelp($first_name, $last_name, $phone_number, $email_address, $address, $id);
    //         if(!$update)
    //         {
    //             array_push($isInvalid, "exist"); 
    //             return $isInvalid;   
    //         }
    //     }
    //     return $isInvalid;
    // }
}
