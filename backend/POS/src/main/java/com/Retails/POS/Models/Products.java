package com.Retails.POS.Models;


import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class Products {
    @Id
    private String _id;
    private String productName;
    private double productPrice;
    private String productImage;
    private int stockQuantity;
    private String category;
    private String userId;

    public Products() {
    }

    public Products(String _id, String productName, double productPrice, String productImage, int stockQuantity, String category, String userId) {
        this._id = _id;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productImage = productImage;
        this.stockQuantity = stockQuantity;
        this.category = category;
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Products{" +
                "_id='" + _id + '\'' +
                ", productName='" + productName + '\'' +
                ", productPrice=" + productPrice +
                ", productImage='" + productImage + '\'' +
                ", stockQuantity=" + stockQuantity +
                ", category='" + category + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(double productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
