package com.Retails.POS.Controllers;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.Retails.POS.Models.Category;
import com.Retails.POS.Models.User;
import com.Retails.POS.Services.UsersServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/user")
public class UsersController {

    @Autowired
    private UsersServices usersServices;
    @Autowired
    PasswordEncoder encoder;

    @GetMapping(value = "/")
    public ResponseEntity<List<User>> getUsers(){
        List<User> usersList = usersServices.getAllUsers();
        return ResponseEntity.ok(usersList);
    }



    @GetMapping(value = "/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id){
        User user = usersServices.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable String id){
        User existingUser = usersServices.getUserById(id);
        if (existingUser != null) {
            // Update existingCategory fields with user fields
            if (user.getUsername()!=null){
                existingUser.setUsername(user.getUsername());
            }

            if (user.getEmail()!=null){
                existingUser.setEmail(user.getEmail());
            }
            if (user.getPassword()!=null){
                existingUser.setPassword(encoder.encode(user.getPassword()));
            }
            if (user.getUserImage()!=null){
                existingUser.setUserImage(user.getUserImage());
            }
            if (user.getShopName()!=null){
                existingUser.setShopName(user.getShopName());
            }
            if (user.getShopLogo()!=null){
                existingUser.setShopLogo(user.getShopLogo());
            }
            if (user.getShopAddress()!=null){
                existingUser.setShopAddress(user.getShopAddress());
            }
            if (user.getShopTax()!=0){
                existingUser.setShopTax(user.getShopTax());
            }
            if (user.getShopPhoneNumber()!=null){
                existingUser.setShopPhoneNumber(user.getShopPhoneNumber());
            }
            if (user.getShopReceiptMessage()!=null){
                existingUser.setShopReceiptMessage(user.getShopReceiptMessage());
            }

            User updatedUser = usersServices.saveUser(existingUser);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id){
        usersServices.deleteUser(id);
        return ResponseEntity.ok("Ok");
    }


}
