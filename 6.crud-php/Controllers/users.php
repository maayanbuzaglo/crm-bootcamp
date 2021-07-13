<?php

require_once('controller.php');

class users extends controller
{
    public $model_cls = "users";
    public function __construct()
    {
        parent::__construct();
    }

    /*
    This function gets all the delivery persons.
    */
    public function getDeliveryPersons()
    {
        $account_id = $this->data->account_id;
        $deliveryPersons = $this->model->getDeliveryPersonsHelp($account_id);
        $this->response["deliveryPersons"] = $deliveryPersons;
        return $this->response;
    }
}
