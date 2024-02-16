package com.Retails.POS.Models;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import java.util.Date;

@Document(collection = "category")
public class Category {
    @Id
    private String id;
    private String category;
    private String categoryImage;
    private String userId;

    @CreatedDate
    private Date createdTime;

    @LastModifiedDate
    private Date updatedTime;

    public Category() {
        this.createdTime = new Date();
        this.updatedTime = new Date();
    }

    public Category(String id, String category, String categoryImage, String userId) {
        this.id = id;
        this.category = category;
        this.categoryImage = categoryImage;
        this.userId = userId;
        this.createdTime = new Date();
        this.updatedTime = new Date();
    }

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategoryImage() {
        return categoryImage;
    }

    public void setCategoryImage(String categoryImage) {
        this.categoryImage = categoryImage;
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

    public Date getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(Date updatedTime) {
        this.updatedTime = updatedTime;
    }
}
