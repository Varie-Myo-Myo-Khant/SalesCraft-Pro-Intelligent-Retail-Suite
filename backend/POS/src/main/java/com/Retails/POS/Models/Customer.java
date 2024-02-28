package com.Retails.POS.Models;

import jakarta.persistence.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "customer")
public class Customer {
    @Id
    private String id;
    private String customer;
    private String phoneNumber;
    private int loyaltyPoint;
    private String userId;
    @CreatedDate
    private Date createdTime;

    public Customer() {
        this.createdTime = new Date();
    }

    public Customer(String id, String customer, String phoneNumber, int loyaltyPoint, String userId, Date createdTime) {
        this.id = id;
        this.customer = customer;
        this.phoneNumber = phoneNumber;
        this.loyaltyPoint = loyaltyPoint;
        this.userId = userId;
        this.createdTime = new Date();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public int getLoyaltyPoint() {
        return loyaltyPoint;
    }

    public void setLoyaltyPoint(int loyaltyPoint) {
        this.loyaltyPoint = loyaltyPoint;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }
}
