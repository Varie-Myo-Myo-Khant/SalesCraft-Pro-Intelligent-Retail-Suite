package com.Retails.POS.Services;

import com.Retails.POS.Models.Orders;
import com.Retails.POS.Models.Session;
import com.Retails.POS.Repository.SessionRepo;
import com.Retails.POS.Services.OrdersServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SessionServices {

    @Autowired
    private SessionRepo sessionRepository;

    @Autowired
    private OrdersServices ordersServices;

    public BigDecimal calculateTotalSalesForDay(Date startTime, Date endTime) {
        List<Orders> orders = ordersServices.getAllOrders();
        BigDecimal totalSales = BigDecimal.ZERO;
        for (Orders order : orders) {
            Date orderTime = order.getCreatedTime();
            if (orderTime.after(startTime) && orderTime.before(endTime)) {
                totalSales = totalSales.add(BigDecimal.valueOf(order.getTotalAmount()));
            }
        }
        return totalSales;
    }

    public BigDecimal calculateAmountInHandForDay(Date startTime, Date endTime) {
        List<Orders> orders = ordersServices.getAllOrders();
        BigDecimal cashInHand = BigDecimal.ZERO;
        for (Orders order : orders) {
            Date orderTime = order.getCreatedTime();
            if (orderTime.after(startTime) && orderTime.before(endTime) && "cash".equals(order.getPaymentType())) {
                cashInHand = cashInHand.add(BigDecimal.valueOf(order.getTotalAmount()));
            }
        }
        return cashInHand;
    }

    public BigDecimal calculateAmountInBankForDay(Date startTime, Date endTime) {
        List<Orders> orders = ordersServices.getAllOrders();
        BigDecimal cashInBank = BigDecimal.ZERO;
        for (Orders order : orders) {
            Date orderTime = order.getCreatedTime();
            if (orderTime.after(startTime) && orderTime.before(endTime) && "credit card".equals(order.getPaymentType())) {
                cashInBank = cashInBank.add(BigDecimal.valueOf(order.getTotalAmount()));
            }
        }
        return cashInBank;
    }

    public Session createSession(Session session) {
        return sessionRepository.save(session);
    }



    public Session closeSession(String sessionId, Session updatedSession) {
        Optional<Session> optionalSession = sessionRepository.findById(sessionId);
        if (optionalSession.isPresent()) {
            Session existingSession = optionalSession.get();
            existingSession.setEndTime(updatedSession.getEndTime());
            existingSession.setClosingCash(updatedSession.getClosingCash());
            existingSession.setTotalSales(calculateTotalSalesForDay(existingSession.getStartTime(), existingSession.getEndTime()));
           existingSession.setCashInHand(calculateAmountInHandForDay(existingSession.getStartTime(), existingSession.getEndTime()));
           existingSession.setCashInBank(calculateAmountInBankForDay(existingSession.getStartTime(), existingSession.getEndTime()));

            return sessionRepository.save(existingSession);
        }
        return null; // Session not found
    }
    public List<Session>  getAllSessions() {
        List<Session> sessionLists=sessionRepository.findAll();
        return sessionLists;
    }

    public void deleteSessions(String sessionId){
        sessionRepository.deleteById(sessionId);
    }


}
