<?php

require_once("Model.php");

class Model_orders extends Model
{
    public function __construct()
    {
        parent::__construct();
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
                                 WHERE orders.client_id = clients.id AND orders.delivery_person_id = users.id")
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
        if(!$remove)
        {
            return $this->getDB()->error;
        }
        return "query succeeded";
    }

    // /*
    // updateClient - help function.
    // update a client in db.
    // */
    // public function updateClientHelp($first_name, $last_name, $phone_number, $email_address, $address, $id)
    // {
    //     $update = $this->getDB()
    //                    ->query("UPDATE clients SET first_name='$first_name', last_name='$last_name', phone_number='$phone_number', email_address='$email_address', address='$address' WHERE id=$id");
    //     return $update;
    // }

}
