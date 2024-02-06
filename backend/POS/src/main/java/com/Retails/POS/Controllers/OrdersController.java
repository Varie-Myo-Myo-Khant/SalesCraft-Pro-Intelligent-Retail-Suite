package com.Retails.POS.Controllers;

import com.Retails.POS.Models.Orders;
import com.Retails.POS.Services.OrdersServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/order")
public class OrdersController {
    @Autowired
    private OrdersServices ordersServices;

    @GetMapping(value = "/")
    public ResponseEntity<List<Orders>> getOrders(){
        List<Orders> ordersList = ordersServices.getAllOrders();
        return ResponseEntity.ok(ordersList);
    }

    @GetMapping(value = "/search/{id}")
    public ResponseEntity<Orders> getOrderById(@PathVariable String id){
        Orders order = ordersServices.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<Orders> saveOrder(@RequestBody Orders orders){
        Orders savedOrder = ordersServices.saveOrder(orders);
        return ResponseEntity.ok(savedOrder);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Orders> updateOrder(@RequestBody Orders order, @PathVariable String id){
        order.set_id(id);
        ordersServices.saveOrder(order);
        return ResponseEntity.ok(order);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable String id){
        ordersServices.deleteOrder(id);
        return ResponseEntity.ok("Ok");
    }
}
