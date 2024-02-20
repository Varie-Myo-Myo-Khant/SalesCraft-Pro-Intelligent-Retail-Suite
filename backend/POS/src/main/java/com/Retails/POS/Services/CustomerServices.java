package com.Retails.POS.Services;


import com.Retails.POS.Models.Customer;
import com.Retails.POS.Repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServices {
    @Autowired
    private CustomerRepo customerRepo;

    public List<Customer> getAllCustomers(){
        return customerRepo.findAll();
    }

    public Customer saveCustomer(Customer customer){
        return customerRepo.save(customer);
    }

    public void deleteCustomer(String id){
        customerRepo.deleteById(id);
    }

}
