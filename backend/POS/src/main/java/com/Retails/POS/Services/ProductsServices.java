package com.Retails.POS.Services;

import com.Retails.POS.Models.Products;
import com.Retails.POS.Models.Session;
import com.Retails.POS.Repository.ProductsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProductsServices {

    @Autowired
    private ProductsRepo productsRepo;

    //to save the the product
    public void saveProduct(Products product){
        productsRepo.save(product);
    }


    public Products updateProducts(String id, Products products) {
        Optional<Products> optionalProducts = productsRepo.findById(id);
        if (optionalProducts.isPresent()) {
            Products existingProducts = optionalProducts.get();
            if (products.getProductName() != null) {
                existingProducts.setProductName(products.getProductName());
            }
            if (products.getProductImage() != null) {
                existingProducts.setProductImage(products.getProductImage());
            }
            if (products.getCategory() != null) {
                existingProducts.setCategory(products.getCategory());
            }
            if (products.getProductPrice() != 0) {
                existingProducts.setProductPrice(products.getProductPrice());
            }
            if (products.getStockQuantity() != -1) {
                existingProducts.setStockQuantity(products.getStockQuantity());
            }

            existingProducts.setUpdatedTime(new Date());
            return productsRepo.save(existingProducts);
        }
        return null;
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

    public List<Products> findByProductCategory(String category){
        return this.productsRepo.findByCategoryContaining(category);
    }
}
