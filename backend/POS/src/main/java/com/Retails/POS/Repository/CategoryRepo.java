package com.Retails.POS.Repository;

import com.Retails.POS.Models.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CategoryRepo extends MongoRepository<Category,String> {



    List<Category> findByCategoryContaining(String category);
}
