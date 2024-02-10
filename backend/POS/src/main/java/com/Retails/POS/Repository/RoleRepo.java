package com.Retails.POS.Repository;

import java.util.Optional;

import com.Retails.POS.Models.ERole;
import com.Retails.POS.Models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface RoleRepo extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}