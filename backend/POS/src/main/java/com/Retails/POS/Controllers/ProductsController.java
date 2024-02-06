package com.Retails.POS.Controllers;

import com.Retails.POS.Models.Products;
import com.Retails.POS.Services.ProductsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/product")
public class ProductsController {

    @Autowired
    private ProductsServices productsServices;

    @GetMapping(value = "/")
    public ResponseEntity<List<Products>> getProducts(){
        List<Products> productList = productsServices.getAllProducts();
        return ResponseEntity.ok(productList);
    }

    @GetMapping(value = "/search/{id}")
    public ResponseEntity<Products> getProductById(@PathVariable String id){
        Products product = productsServices.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<String> saveProduct(@RequestBody Products products){
        productsServices.saveProduct(products);
        return ResponseEntity.ok(products.get_id());
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Products> updateProduct(@RequestBody Products products, @PathVariable String id){
        products.set_id(id);
        productsServices.saveProduct(products);
        return ResponseEntity.ok(products);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable String id){
        productsServices.deleteProduct(id);
        return ResponseEntity.ok("Ok");
    }


}