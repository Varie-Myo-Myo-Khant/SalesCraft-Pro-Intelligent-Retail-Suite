package com.Retails.POS.Controllers;



import com.Retails.POS.Models.User;
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
    public ResponseEntity<List<User>> getUsers(){
        List<User> usersList = usersServices.getAllUsers();
        return ResponseEntity.ok(usersList);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id){
        User user = usersServices.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping(value = "/")
    public ResponseEntity<String> saveUser(@RequestBody User user){
        usersServices.saveUser(user);
        return ResponseEntity.ok(user.getId());
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable String id){
        user.setId(id);
        usersServices.saveUser(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id){
        usersServices.deleteUser(id);
        return ResponseEntity.ok("Ok");
    }


}
