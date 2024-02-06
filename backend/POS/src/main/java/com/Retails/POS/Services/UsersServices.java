package com.Retails.POS.Services;

import com.Retails.POS.Models.Products;
import com.Retails.POS.Models.Users;
import com.Retails.POS.Repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersServices {
    @Autowired
    private UsersRepo usersRepo;

    public List<Users> getAllUsers(){
        return usersRepo.findAll();
    }

    public Users saveUser(Users user){
        return usersRepo.save(user);
    }
    public void deleteUser(String id){
        usersRepo.deleteById(id);
    }

    public Users getUserById(String userId){
        return usersRepo.findById(userId).get();
    }
}
