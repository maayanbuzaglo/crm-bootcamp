<?php

require_once("Model.php");

class Model_dashboard extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    /*
    getProductsTypesDetails - help function.
    */
    public function getProductsTypesDetailsHelp()
    {
        $productsTypesDetails = $this->getDB()
                        ->query("SELECT product_type, COUNT(product_type) AS numOfType
                                 FROM (SELECT orders.id, product_type
                                    FROM orders
                                    INNER JOIN orders_products ON orders.id=orders_products.order_id
                                    INNER JOIN products ON orders_products.product_id=products.id) allOrders
                                 GROUP BY product_type
                                 ORDER BY product_type;")
                        ->fetch_all(MYSQLI_ASSOC);
        return $productsTypesDetails;
    }
    
    /*
    getWeekOrdersDetails - help function.
    */
    public function getWeekOrdersDetailsHelp()
    {
        $ordersDetails = $this->getDB()
                        ->query("SELECT DAYOFWEEK(date) AS day, COUNT(day(date)) AS numOfOrders
                                 FROM orders
                                 WHERE week(now())=week(date)
                                 GROUP BY day")
                        ->fetch_all(MYSQLI_ASSOC);
        return $ordersDetails;
    }

    /*
    getDeliveriesDayDetails - help function.
    */
    public function getDeliveriesDayDetailsHelp()
    {
        $deliveriesDetails = $this->getDB()
                        ->query('SELECT CONCAT(users.first_name, " ", users.last_name) AS deliveryPersonName, COUNT(users.id) AS numOfDeliveries
                                 FROM orders
                                 JOIN users ON users.id = delivery_person_id
                                 WHERE day(now())=day(date)
                                 GROUP BY users.id
                                 ORDER BY numOfDeliveries DESC
                                 LIMIT 5')
                        ->fetch_all(MYSQLI_ASSOC);
        return $deliveriesDetails;
    }

    /*
    getTodayVsLastWeek - help function.
    */
    public function getTodayTotalSalesHelp()
    {
        $todayTotal = $this->getDB()
                        ->query("SELECT SUM(product_price) AS todayTotalSales
                                 FROM orders
                                 JOIN orders_products ON orders.id=orders_products.order_id
                                 JOIN products ON orders_products.product_id=products.id
                                 WHERE day(date) = day(NOW());")
                        ->fetch_all(MYSQLI_ASSOC);
        return $todayTotal;
    }

    /*
    getLastWeekTotalSales - help function.
    */
    public function getLastWeekTotalSalesHelp()
    {
        $lastWeekTotal = $this->getDB()
                        ->query("SELECT SUM(product_price) AS lastWeekTotalSales
                                 FROM orders
                                 JOIN orders_products ON orders.id=orders_products.order_id
                                 JOIN products ON orders_products.product_id=products.id
                                 WHERE day(date) = day(DATE_SUB(CURDATE(), INTERVAL 7 DAY));")
                        ->fetch_all(MYSQLI_ASSOC);
        return $lastWeekTotal;
    }
}
