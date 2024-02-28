package com.Retails.POS.Models;

import java.util.HashSet;
import java.util.Set;

import com.Retails.POS.Models.Role;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Document(collection = "users")
public class User {
    @Id
    private String id;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 120)
    private String password;

    @DBRef
    private Set<Role> roles = new HashSet<>();

    private String userImage;
    private String shopName;
    private String shopLogo;
    private int shopTax;
    private String shopAddress;
    private String shopReceiptMessage;
    private String shopPhoneNumber;
    public User() {
    }

    public User(String id, String username, String email, String password, Set<Role> roles, String userImage, String shopName, String shopLogo, int shopTax, String shopAddress, String shopReceiptMessage, String shopPhoneNumber) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.userImage = userImage;
        this.shopName = shopName;
        this.shopLogo = shopLogo;
        this.shopTax = shopTax;
        this.shopAddress = shopAddress;
        this.shopReceiptMessage = shopReceiptMessage;
        this.shopPhoneNumber = shopPhoneNumber;
    }

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getUserImage() {
        return userImage;
    }

    public void setUserImage(String userImage) {
        this.userImage = userImage;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getShopLogo() {
        return shopLogo;
    }

    public void setShopLogo(String shopLogo) {
        this.shopLogo = shopLogo;
    }

    public int getShopTax() {
        return shopTax;
    }

    public void setShopTax(int shopTax) {
        this.shopTax = shopTax;
    }

    public String getShopAddress() {
        return shopAddress;
    }

    public void setShopAddress(String shopAddress) {
        this.shopAddress = shopAddress;
    }

    public String getShopReceiptMessage() {
        return shopReceiptMessage;
    }

    public void setShopReceiptMessage(String shopReceiptMessage) {
        this.shopReceiptMessage = shopReceiptMessage;
    }

    public String getShopPhoneNumber() {
        return shopPhoneNumber;
    }

    public void setShopPhoneNumber(String shopPhoneNumber) {
        this.shopPhoneNumber = shopPhoneNumber;
    }
}