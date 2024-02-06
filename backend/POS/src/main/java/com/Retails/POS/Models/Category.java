package com.Retails.POS.Models;

import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "category")
public class Category {
    @Id
    private String _id;
    private String categoryImage;
    private String category;

    public Category() {
    }

    public Category(String _id, String categoryImage, String category) {
        this._id = _id;
        this.categoryImage = categoryImage;
        this.category = category;
    }

    @Override
    public String toString() {
        return "Category{" +
                "_id='" + _id + '\'' +
                ", categoryImage='" + categoryImage + '\'' +
                ", category='" + category + '\'' +
                '}';
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getCategoryImage() {
        return categoryImage;
    }

    public void setCategoryImage(String categoryImage) {
        this.categoryImage = categoryImage;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
