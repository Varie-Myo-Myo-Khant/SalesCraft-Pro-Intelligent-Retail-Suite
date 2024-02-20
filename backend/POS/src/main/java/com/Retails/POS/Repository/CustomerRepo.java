package com.Retails.POS.Repository;

import com.Retails.POS.Models.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerRepo extends MongoRepository<Customer,String> {
}
