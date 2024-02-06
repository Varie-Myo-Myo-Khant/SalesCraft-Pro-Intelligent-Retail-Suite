package com.Retails.POS.Models;

import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "orders")
public class Orders {
    @Id
    private String _id;
    private String orderNumber;
    private String customer;
    private List<String> cartItems;
    private double subTotal;
    private double totalAmount;
    private double tax;
    private String paymentType;
    private String userId;

    public Orders() {
    }

    public Orders(String _id, String orderNumber, String customer, List<String> cartItems, double subTotal, double totalAmount, double tax, String paymentType, String userId) {
        this._id = _id;
        this.orderNumber = orderNumber;
        this.customer = customer;
        this.cartItems = cartItems;
        this.subTotal = subTotal;
        this.totalAmount = totalAmount;
        this.tax = tax;
        this.paymentType = paymentType;
        this.userId = userId;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public List<String> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<String> cartItems) {
        this.cartItems = cartItems;
    }

    public double getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(double subTotal) {
        this.subTotal = subTotal;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public double getTax() {
        return tax;
    }

    public void setTax(double tax) {
        this.tax = tax;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Orders{" +
                "_id='" + _id + '\'' +
                ", orderNumber='" + orderNumber + '\'' +
                ", customer='" + customer + '\'' +
                ", cartItems=" + cartItems +
                ", subTotal=" + subTotal +
                ", totalAmount=" + totalAmount +
                ", tax=" + tax +
                ", paymentType='" + paymentType + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }
}
