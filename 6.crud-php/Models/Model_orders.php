<?php

require_once("Model.php");

class Model_orders extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    /*
    getOrder - help function.
    select query to a specific order.
    */
    public function getOrderHelp($id)
    {
        $order = $this->getDB()
                        ->query("SELECT orders.id,
                                 CONCAT(clients.first_name, ' ', clients.last_name) AS client_name,
                                 clients.id AS client_id,
                                 CONCAT(users.first_name, ' ', users.last_name) AS user_name,
                                 users.id AS user_id,
                                 products.product_name,
                                 products.id AS product_id,
                                 date
                                 FROM  orders
                                 JOIN clients, users, orders_products, products
                                 WHERE orders.client_id = clients.id
                                 AND orders.delivery_person_id = users.id
                                 AND orders_products.order_id = orders.id
                                 AND orders_products.product_id = products.id
                                 AND orders.id = $id")
                        ->fetch_all(MYSQLI_ASSOC);
        return $order;
    }

    /*
    getMenu - help function.
    select query to all products.
    */
    public function getMenuHelp($account_id)
    {
        $menu = $this->getDB()
                     ->query("SELECT *
                              FROM products
                              WHERE account_id=$account_id")
                     ->fetch_all(MYSQLI_ASSOC);
        return $menu;
    }

    /*
    getOrders - help function.
    select query to all orders.
    */
    public function getOrdersHelp($account_id)
    {
        $orders = $this->getDB()
                        ->query("SELECT orders.id,
                                        CONCAT(clients.first_name, ' ', clients.last_name) AS client_name,
                                        CONCAT(users.first_name, ' ', users.last_name) AS user_name,
                                        date,
                                        total_price
                                 FROM  orders
                                 JOIN clients, users
                                 WHERE orders.client_id = clients.id AND orders.delivery_person_id = users.id
                                 ORDER BY date")
                        ->fetch_all(MYSQLI_ASSOC);
        return $orders;
    }

    /*
    addOrder - help function.
    inserts to db the new order.
    */
    public function addOrderHelp($client_id, $delivery_person_id, $date, $account_id, $products)
    {
        //Gets the client address.
        $address = $this->getDB()
                        ->query("SELECT address
                                 FROM clients
                                 WHERE id=$client_id")
                        ->fetch_all(MYSQLI_ASSOC);
        $location = $address[0]["address"];
        //Inserts all the values except total price to orders.
        $insert = $this->getDB()
                       ->query("INSERT INTO orders (account_id, client_id, delivery_person_id, location, date)
                                VALUES ('$account_id', '$client_id', '$delivery_person_id', '$location', '$date')");
        if($insert)
        {
            $lastId = mysqli_insert_id($this->getDB());
            //Insert al the products of the order to orders_products table.
            foreach($products as $product)
            {
                $insertProducts = $this->getDB()
                                       ->query("INSERT INTO orders_products (order_id, product_id)
                                                VALUES ('$lastId', '$product->value')");  
            }
        }
        //Gets the total price of the order.
        $total = $this->getDB()
                      ->query("SELECT SUM(product_price) as total_price
                               FROM products
                               INNER JOIN orders_products ON products.id = orders_products.product_id
                               WHERE orders_products.order_id=$lastId")
                      ->fetch_all(MYSQLI_ASSOC);
        if($total)
        {
            $totalPrice = $total[0]["total_price"];
            //Insert the total price to orders.
            $insert = $this->getDB()
                            ->query("UPDATE orders
                                     SET total_price='$totalPrice$'
                                     WHERE id=$lastId");
        }
        return $insert;
    }

    /*
    removeOrder - help function.
    delete order from db.
    */
    public function removeOrderHelp($id)
    {
        $remove = $this->getDB()->query("DELETE FROM orders WHERE id = '$id'");
        if($remove)
        {
            $remove = $this->getDB()->query("DELETE FROM orders_products WHERE order_id = $id");
        }
        return $remove;
    }

    /*
    updateOrder - help function.
    update an order in db.
    */
    public function updateOrderHelp($order_id,  $client_id, $delivery_person_id, $date, $products)
    {
        //Gets the client address.
        $address = $this->getDB()
                        ->query("SELECT address
                                 FROM clients
                                 WHERE id=$client_id")
                        ->fetch_all(MYSQLI_ASSOC);
        $location = $address[0]["address"];
        //Updates all the values except total price.
        $update = $this->getDB()
                       ->query("UPDATE orders
                                SET client_id='$client_id',
                                delivery_person_id='$delivery_person_id',
                                location='$location', date='$date'
                                WHERE id=$order_id");
        if($update)
        {
            $remove = $this->getDB()->query("DELETE FROM orders_products WHERE order_id = $order_id");
            if($remove)
            {
                foreach($products as $product)
                {
                    $insertProducts = $this->getDB()
                                           ->query("INSERT INTO orders_products (order_id, product_id)
                                                    VALUES ('$order_id', '$product->value')");  
                }
            }
        }

        //Gets the total price of the order.
        $total = $this->getDB()
                      ->query("SELECT SUM(product_price) as total_price
                               FROM products
                               INNER JOIN orders_products ON products.id = orders_products.product_id
                               WHERE orders_products.order_id=$order_id")
                      ->fetch_all(MYSQLI_ASSOC);
        if($total)
        {
            $totalPrice = $total[0]["total_price"];
            //Insert the total price to orders.
            $update = $this->getDB()
                            ->query("UPDATE orders
                                     SET total_price='$totalPrice$'
                                     WHERE id=$order_id");
        }
        return $update;
    }

}
