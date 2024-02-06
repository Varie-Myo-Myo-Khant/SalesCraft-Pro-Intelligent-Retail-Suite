package com.Retails.POS.Repository;

import com.Retails.POS.Models.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepo extends MongoRepository<Category,String> {
}
