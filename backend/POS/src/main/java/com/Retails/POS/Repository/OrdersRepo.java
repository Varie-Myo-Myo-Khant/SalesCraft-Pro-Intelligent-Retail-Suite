package com.Retails.POS.Repository;

import com.Retails.POS.Models.Orders;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrdersRepo extends MongoRepository<Orders,String> {
}
