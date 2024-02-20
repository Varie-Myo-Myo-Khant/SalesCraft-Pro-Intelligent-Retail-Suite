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
    private String userLogo;
    private int userTax;
    private String userAddress;
    private String userReceiptMessage;
    private String userPhoneNumber;
    public User() {
    }

    public User(String id, String username, String email, String password, Set<Role> roles, String userImage, String userLogo, int userTax, String userAddress, String userReceiptMessage, String userPhoneNumber) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.userImage = userImage;
        this.userLogo = userLogo;
        this.userTax = userTax;
        this.userAddress = userAddress;
        this.userReceiptMessage = userReceiptMessage;
        this.userPhoneNumber = userPhoneNumber;
    }

    public User(String id, String username, String password)
    {
        this.id = id;
        this.username = username;
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

    public String getUserLogo() {
        return userLogo;
    }

    public void setUserLogo(String userLogo) {
        this.userLogo = userLogo;
    }

    public int getUserTax() {
        return userTax;
    }

    public void setUserTax(int userTax) {
        this.userTax = userTax;
    }

    public String getUserAddress() {
        return userAddress;
    }

    public void setUserAddress(String userAddress) {
        this.userAddress = userAddress;
    }

    public String getUserReceiptMessage() {
        return userReceiptMessage;
    }

    public void setUserReceiptMessage(String userReceiptMessage) {
        this.userReceiptMessage = userReceiptMessage;
    }

    public String getUserPhoneNumber() {
        return userPhoneNumber;
    }

    public void setUserPhoneNumber(String userPhoneNumber) {
        this.userPhoneNumber = userPhoneNumber;
    }
}