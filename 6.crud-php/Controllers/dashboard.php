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
        $productsTypesDetails = $this->model->getProductsTypesDetailsHelp();
        $this->response["dashboard"] = $productsTypesDetails;
        return $this->response;
    }

    /*
    This function gets the number of every day orders of the week.
    */
    public function getWeekOrdersDetails()
    {
        $ordersDetails = $this->model->getWeekOrdersDetailsHelp();
        $this->response["dashboard"] = $ordersDetails;
        return $this->response;
    }

    /*
    This function gets the numbers of current day deliveries of every delivery person.
    */
    public function getDeliveriesDayDetails()
    {
        $deliveriesDetails = $this->model->getDeliveriesDayDetailsHelp();
        $this->response["dashboard"] = $deliveriesDetails;
        return $this->response;
    }

    /*
    This function gets the sales of this day.
    */
    public function getTodayTotalSales()
    {
        $todayTotal = $this->model->getTodayTotalSalesHelp();
        $this->response["dashboard"] = $todayTotal;
        return $this->response;
    }

    /*
    This function gets the sales of this day last week.
    */
    public function getLastWeekTotalSales()
    {
        $lastWeekTotal = $this->model->getLastWeekTotalSalesHelp();
        $this->response["dashboard"] = $lastWeekTotal;
        return $this->response;
    }
}
