package com.Retails.POS.Repository;

import com.Retails.POS.Models.Products;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductsRepo extends MongoRepository <Products,String>{
}
