package com.Retails.POS.Repository;

import com.Retails.POS.Models.Session;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SessionRepo extends MongoRepository<Session,String> {
}
