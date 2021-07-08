<?php

require_once("Model.php");

class Model_products extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    /*
    getProduct - help function.
    select query to a specific product.
    */
    public function getProductHelp($id)
    {
        $product = $this->getDB()
                        ->query("SELECT * FROM  products WHERE id=$id")
                        ->fetch_all(MYSQLI_ASSOC);
        return $product;
    }

    /*
    getProducts - help function.
    select query to all products.
    */

    public function getProductsHelp($account_id, $product_type)
    {
        $products = $this->getDB()
                        ->query("SELECT * FROM  products WHERE account_id=$account_id AND product_type='$product_type'")
                        ->fetch_all(MYSQLI_ASSOC);
        return $products;
    }

    /*
    addProduct - help function.
    inserts to db the new product.
    */
    public function addProductHelp($product_name, $product_price, $product_type, $account_id)
    {
        $insert = $this->getDB()
                       ->query("INSERT INTO products (product_name, product_price, product_type, account_id) VALUES ('$product_name', '$product_price', '$product_type', '$account_id')");

        exit($this->getDB()->error);
        if(!$insert)
        {
            return false;
        }
        return true;
    }

    // /*
    // removeClient - help function.
    // delete client from db.
    // */
    // public function removeClientHelp($id)
    // {
    //     $remove = $this->getDB()->query("DELETE FROM clients WHERE id = '$id'");
    //     if(!$remove)
    //     {
    //         return $this->getDB()->error;
    //     }
    //     return "query succeeded";
    // }

    /*
    updateProduct - help function.
    update a product in db.
    */
    public function updateProductHelp($product_name, $product_price, $id)
    {
        $update = $this->getDB()
                       ->query("UPDATE products SET product_name='$product_name', product_price='$product_price' WHERE id=$id");
        return $update;
    }

    // public function validate($first_name, $last_name, $phone_number, $email_address, $address)
    // {
    //     $invalidInputs = array();
    //     $phoneRegex = "/^05\d([-]{0,1})\d{7}$/"; //phone Regex.
    //     $emailRegex = "/^([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/"; //email Regex.
      
    //     if(!strlen($first_name)) array_push($invalidInputs, "first_name");   
    //     if(!strlen($last_name)) array_push($invalidInputs, "last_name");   
    //     if(!strlen($address)) array_push($invalidInputs, "address");   
    //     if (!preg_match($phoneRegex, $phone_number)) array_push($invalidInputs, "phone");
    //     if (!preg_match($emailRegex, $email_address)) array_push($invalidInputs, "email");   
        
    //     return $invalidInputs;
    // }
}
