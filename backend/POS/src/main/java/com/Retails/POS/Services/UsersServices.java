package com.Retails.POS.Services;


import com.Retails.POS.Models.User;
import com.Retails.POS.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersServices {
    @Autowired
    private UserRepo usersRepo;

    public List<User> getAllUsers(){
        return usersRepo.findAll();
    }

    public User saveUser(User user){
        return usersRepo.save(user);
    }
    public void deleteUser(String id){
        usersRepo.deleteById(id);
    }

    public User getUserById(String userId){
        return usersRepo.findById(userId).get();
    }
}
