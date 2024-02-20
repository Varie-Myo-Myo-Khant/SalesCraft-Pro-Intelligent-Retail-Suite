package com.Retails.POS.Controllers;

import com.Retails.POS.Models.Customer;
import com.Retails.POS.Services.CustomerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/customer")
public class CustomerController {

    @Autowired
    private CustomerServices customerServices;

    @GetMapping(value = "/")
    public ResponseEntity<List<Customer>> getAllCustomers(){
        List<Customer> customerList = customerServices.getAllCustomers();
        return ResponseEntity.ok(customerList);
    }
    @PostMapping(value = "/")
    public ResponseEntity<String> saveCustomer(@RequestBody Customer customer){
        customerServices.saveCustomer(customer);
        return ResponseEntity.ok(customer.getId());
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Customer> updateCustomer(@RequestBody Customer customer, @PathVariable String id){
        customer.setId(id);
        customerServices.saveCustomer(customer);
        return ResponseEntity.ok(customer);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id){
        customerServices.deleteCustomer(id);
        return ResponseEntity.ok("Ok");
    }


}
