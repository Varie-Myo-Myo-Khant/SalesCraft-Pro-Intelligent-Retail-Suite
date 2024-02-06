package com.Retails.POS.Repository;

import com.Retails.POS.Models.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsersRepo extends MongoRepository<Users,String> {
}
