package com.Retails.POS.Controllers;


import com.Retails.POS.Models.Users;
import com.Retails.POS.Services.UsersServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/user")
public class UsersController {

    @Autowired
    private UsersServices usersServices;

    @GetMapping(value = "/")
    public ResponseEntity<List<Users>> getUsers(){
        List<Users> usersList = usersServices.getAllUsers();
        return ResponseEntity.ok(usersList);
    }

    @GetMapping(value = "/search/{id}")
    public ResponseEntity<Users> getUserById(@PathVariable String id){
        Users user = usersServices.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<String> saveUser(@RequestBody Users user){
        usersServices.saveUser(user);
        return ResponseEntity.ok(user.get_id());
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Users> updateUser(@RequestBody Users user, @PathVariable String id){
        user.set_id(id);
        usersServices.saveUser(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id){
        usersServices.deleteUser(id);
        return ResponseEntity.ok("Ok");
    }


}
