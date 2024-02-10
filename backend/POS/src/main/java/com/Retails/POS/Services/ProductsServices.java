package com.Retails.POS.Services;

import com.Retails.POS.Models.Products;
import com.Retails.POS.Repository.ProductsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductsServices {

    @Autowired
    private ProductsRepo productsRepo;

    //to save the the product
    public void saveProduct(Products product){
        productsRepo.save(product);
    }

    //to retrieve all the products
    public List<Products> getAllProducts(){
        return this.productsRepo.findAll();
    }

    //to detete all the products by id
    public void deleteProduct(String id){
        productsRepo.deleteById(id);
    }

    //to retrieve the product by id
    public Products getProductById(String productId){
        return productsRepo.findById(productId).get();
    }

    //to retrive the by Product Name.
    public List<Products> findByProductName(String productName){
        return this.productsRepo.findByProductNameContaining(productName);
    }
}
