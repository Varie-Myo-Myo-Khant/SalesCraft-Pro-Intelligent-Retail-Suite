package com.Retails.POS.Models;

import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "roles")
public class Role {
    @Id
    private String _id;
    private ERole name;

    public Role() {
    }

    public Role(String _id, ERole name) {
        this._id = _id;
        this.name = name;
    }

    @Override
    public String toString() {
        return "Role{" +
                "_id='" + _id + '\'' +
                ", name=" + name +
                '}';
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public ERole getName() {
        return name;
    }

    public void setName(ERole name) {
        this.name = name;
    }
}
