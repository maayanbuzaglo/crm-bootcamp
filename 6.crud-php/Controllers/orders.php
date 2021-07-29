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
    This function gets a specific order.
    */
    public function getOrder()
    {
        $id = $this->data->id;
        $order = $this->model->getOrderHelp($id);
        $this->response["order"] = $order;
        return $this->response;
    }

    /*
    This function gets all the orders of a specific delivery person.
    */
    public function getOrdersDetails()
    {
        $delivery_person_id = $this->data->delivery_person_id;
        $orders = $this->model->getOrdersDetailsHelp($delivery_person_id);
        $this->response["orders"] = $orders;
        return $this->response;
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
    This function gets all the next orders.
    */
    public function getOrders()
    {
        $account_id = $this->data->account_id;
        $orders = $this->model->getOrdersHelp($account_id);
        $this->response["orders"] = $orders;
        return $this->response;
    }

    /*
    This function gets all the orders.
    */
    public function getAllOrders()
    {
        $account_id = $this->data->account_id;
        $orders = $this->model->getAllOrdersHelp($account_id);
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

        /*
    This function adds a new client to clients table.
    */
    public function updateOrder()
    {
        $order_id = $this->data->form->id;
        $client_id = $this->data->form->client_id;
        $delivery_person_id = $this->data->form->delivery_person_id;
        $date = $this->data->form->date;
        $products = $this->data->form->products;
        $status = $this->data->form->status;
        
        $update = $this->model->updateOrderHelp($order_id, $client_id, $delivery_person_id, $date, $products, $status);
        return $update;
    }
}
