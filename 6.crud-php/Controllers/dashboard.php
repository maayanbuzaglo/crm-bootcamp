<?php

require_once('controller.php');

class dashboard extends controller
{
    public $model_cls = "dashboard";
    public function __construct()
    {
        parent::__construct();
    }

    /*
    This function gets the number of every product type of all ordered orders.
    */
    public function getProductsTypesDetails()
    {
        $accountId = $this->data->id;
        $productsTypesDetails = $this->model->getProductsTypesDetailsHelp($accountId);
        $this->response["dashboard"] = $productsTypesDetails;
        return $this->response;
    }

    /*
    This function gets the number of every day orders of the week.
    */
    public function getWeekOrdersDetails()
    {
        $accountId = $this->data->id;
        $ordersDetails = $this->model->getWeekOrdersDetailsHelp($accountId);
        $this->response["dashboard"] = $ordersDetails;
        return $this->response;
    }

    /*
    This function gets the numbers of current day deliveries of every delivery person.
    */
    public function getDeliveriesDayDetails()
    {
        $accountId = $this->data->id;
        $deliveriesDetails = $this->model->getDeliveriesDayDetailsHelp($accountId);
        $this->response["dashboard"] = $deliveriesDetails;
        return $this->response;
    }

    /*
    This function gets the sales of this day.
    */
    public function getTodayTotalSales()
    {
        $accountId = $this->data->id;
        $todayTotal = $this->model->getTodayTotalSalesHelp($accountId);
        $this->response["dashboard"] = $todayTotal;
        return $this->response;
    }

    /*
    This function gets the sales of this day last week.
    */
    public function getLastWeekTotalSales()
    {
        $accountId = $this->data->id;
        $lastWeekTotal = $this->model->getLastWeekTotalSalesHelp($accountId);
        $this->response["dashboard"] = $lastWeekTotal;
        return $this->response;
    }
}
