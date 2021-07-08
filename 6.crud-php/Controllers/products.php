<?php

require_once('controller.php');

class products extends controller
{
    public $model_cls = "products";
    public function __construct()
    {
        parent::__construct();
    }

    /*
    This function gets a specific product.
    */
    public function getProduct()
    {
        $id = $this->data->id;
        $product = $this->model->getProductHelp($id);
        $this->response["product"] = $product;
        return $this->response;
    }

    /*
    This function gets all the products.
    */
    public function getProducts()
    {
        $account_id = $this->data->account_id;
        $product_type = $this->data->product_type;
        $products = $this->model->getProductsHelp($account_id, $product_type);
        $this->response["products"] = $products;
        return $this->response;
    }

    /*
    This function adds a new product to products table.
    */
    public function addProduct()
    {
        $product_name = $this->data->form->product_name;
        $product_price = $this->data->form->product_price;
        $product_type = $this->data->form->product_type;
        $account_id = $this->data->form->account_id;

        $insert = $this->model->addProductHelp($product_name, $product_price, $product_type, $account_id);
        return $insert;   
    }

    // /*
    // This function remove client from clients table.
    // */
    // public function removeClient()
    // {
    //     $id = $this->data->id;

    //     $remove = $this->model->removeClientHelp($id);
    //     $this->response = $remove;
    //     return $this->response;
    // }

    /*
    This function adds a new product to products table.
    */
    public function updateProduct()
    {
        $product_name = $this->data->form->product_name;
        $product_price = $this->data->form->product_price;
        $id = $this->data->form->id;
        
        $update = $this->model->updateProductHelp($product_name, $product_price, $id);
        return $update;
    }
}
