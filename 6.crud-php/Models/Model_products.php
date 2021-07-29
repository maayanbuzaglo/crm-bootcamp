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
                        ->query("SELECT * FROM  products WHERE account_id=$account_id AND product_type='$product_type' ORDER BY product_name")
                        ->fetch_all(MYSQLI_ASSOC);
        return $products;
    }

    /*
    addProduct - help function.
    inserts to db the new product.
    */
    public function addProductHelp($product_name, $product_price, $product_type, $account_id)
    {
        //If the values not null.
        if($product_name){
            $insert = $this->getDB()
                         ->query("INSERT INTO products (product_name, product_price, product_type, account_id) VALUES ('$product_name', '$product_price', '$product_type', '$account_id')");
            if(!$insert)
            {
                return false;
            }
            return true;
        }
    }

    /*
    removeProduct - help function.
    delete client from db.
    */
    public function removeProductHelp($id)
    {
        $remove = $this->getDB()->query("DELETE FROM products WHERE id = '$id'");
        if(!$remove)
        {
            return $this->getDB()->error;
        }
        return "query succeeded";
    }

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

    /*
    uploadProductImage - help function.
    inserts an image src to product in db.
    */
    public function uploadProductImageHelp($imageSrc, $id)
    {
        $insert = $this->getDB()
                       ->query("UPDATE products SET image='$imageSrc' WHERE id=$id");
        return $insert;
    }

    /*
    deleteProductImage - help function.
    deletes the img src of specific product from db.
    */
    public function deleteProductImageHelp($id)
    {
        $delete = $this->getDB()
                       ->query("UPDATE products SET image='' WHERE id=$id");
        return $delete;
    }
}
