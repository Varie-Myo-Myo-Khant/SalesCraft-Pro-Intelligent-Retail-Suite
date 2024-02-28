package com.Retails.POS.Models;

import jakarta.persistence.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Document(collection = "session")
public class Session {

    @Id
    private String id;

    @CreatedDate
    private Date startTime;
    @LastModifiedDate
    private Date endTime;
    private BigDecimal openingCash;
    private BigDecimal closingCash;
    private BigDecimal totalSales;
    private BigDecimal cashInHand;
    private BigDecimal cashInBank;

    private String userId;
    public Session() {
        this.startTime= new Date();
        this.endTime = new Date();
    }

    public Session(BigDecimal openingCash) {
        this.openingCash = openingCash;
        this.startTime= new Date();
    }

    public Session(String id, Date startTime, Date endTime, BigDecimal openingCash, BigDecimal closingCash, BigDecimal totalSales, BigDecimal cashInHand, BigDecimal cashInBank, String userId) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.openingCash = openingCash;
        this.closingCash = closingCash;
        this.totalSales = totalSales;
        this.cashInHand = cashInHand;
        this.cashInBank = cashInBank;
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public BigDecimal getOpeningCash() {
        return openingCash;
    }

    public void setOpeningCash(BigDecimal openingCash) {
        this.openingCash = openingCash;
    }

    public BigDecimal getClosingCash() {
        return closingCash;
    }

    public void setClosingCash(BigDecimal closingCash) {
        this.closingCash = closingCash;
    }

    public BigDecimal getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(BigDecimal totalSales) {
        this.totalSales = totalSales;
    }

    public BigDecimal getCashInHand() {
        return cashInHand;
    }

    public void setCashInHand(BigDecimal cashInHand) {
        this.cashInHand = cashInHand;
    }

    public BigDecimal getCashInBank() {
        return cashInBank;
    }

    public void setCashInBank(BigDecimal cashInBank) {
        this.cashInBank = cashInBank;
    }
}
