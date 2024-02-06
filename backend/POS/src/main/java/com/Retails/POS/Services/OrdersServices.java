package com.Retails.POS.Services;

import com.Retails.POS.Models.Orders;
import com.Retails.POS.Repository.OrdersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersServices {
    @Autowired
    private OrdersRepo ordersRepo;

    public List<Orders> getAllOrders(){
        return ordersRepo.findAll();
    }

    public Orders saveOrder(Orders order){
        return ordersRepo.save(order);

    }
    public void deleteOrder(String id){
        ordersRepo.deleteById(id);
    }

    public Orders getOrderById(String orderId){
        return ordersRepo.findById(orderId).get();
    }
}
