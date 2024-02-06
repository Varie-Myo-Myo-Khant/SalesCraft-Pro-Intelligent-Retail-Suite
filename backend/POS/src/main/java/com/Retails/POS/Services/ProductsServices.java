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

    public void saveProduct(Products product){
        productsRepo.save(product);
    }

    public List<Products> getAllProducts(){
        return this.productsRepo.findAll();
    }

    public void deleteProduct(String id){
        productsRepo.deleteById(id);
    }

    public Products getProductById(String productId){
        return productsRepo.findById(productId).get();
    }
}
