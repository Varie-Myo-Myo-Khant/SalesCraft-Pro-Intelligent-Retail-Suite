package com.Retails.POS.ReportAnalysis;

import com.Retails.POS.Models.Orders;
import com.Retails.POS.Services.OrdersServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api")
public class AssociationRuleController {

    @Autowired
    private OrdersServices ordersServices;

    @GetMapping("/report/promotion")
    public ResponseEntity<Map<String, Object>> getAssociationRules() {
        // Default minimum support and confidence
        double minimumSupport = 0.02; // 50%
        double minimumConfidence = 0.4; // 50%

        // Step 1: Extract data and perform association rule mining
        List<Orders> ordersList = ordersServices.getAllOrders();
        List<Set<String>> transactionList = extractTransactions(ordersList);


        //generate frequent items with transaction after data extraction.
        AprioriFrequentItemsetGenerator<String> generator =new AprioriFrequentItemsetGenerator<>();
        FrequentItemsetData<String> frequentItemSetdata  = generator.generate(transactionList, minimumSupport);


        //Generate Association rules
        List<AssociationRule<String>> associationRuleList =new AssociationRuleGenerator<String>().mineAssociationRules(frequentItemSetdata , minimumConfidence);


        // Prepare the response
        Map<String, Object> response = new HashMap<>();
//        response.put("frequentItemsetData", formatFrequentItemsetData(frequentItemSetdata));
//        response.put("associationRules", formatAssociationRules(associationRuleList));
        response.put("associationRules",associationRuleList);

        return ResponseEntity.ok().body(response);
    }


    private List<Set<String>> extractTransactions(List<Orders> ordersList) {
        List<Set<String>> transactionList = new ArrayList<>();
        for (Orders order : ordersList) {
            Set<String> productIds = new HashSet<>();
            // Get the list of cart items from the order
            List<Map<String, Object>> cartItems = order.getCartItems();
            // Iterate over each cart item map in the list
            for (Map<String, Object> cartItem : cartItems) {
                // Extract the product ID from the cart item map
                String productId = (String) cartItem.get("id");
                productIds.add(productId);
            }
            transactionList.add(productIds);
        }
        return transactionList;
    }
    private List<String> formatFrequentItemsetData(FrequentItemsetData<String> frequentItemSetdata) {
        List<String> formattedData = new ArrayList<>();
        int i = 1;
        for (Set<String> itemset : frequentItemSetdata.getFrequentItemsetList()) {
            double support = frequentItemSetdata.getSupport(itemset);
            String formattedItemset = String.format("%2d: %9s, Support: %1.1f", i++, itemset, support);
            formattedData.add(formattedItemset);
        }
        return formattedData;
    }
    private List<String> formatAssociationRules(List<AssociationRule<String>> associationRuleList) {
        List<String> formattedRules = new ArrayList<>();
        int i = 1;
        for (AssociationRule<String> rule : associationRuleList) {
            formattedRules.add(String.format("%2d: %s",i++, rule.toString()));
        }
        return formattedRules;
    }

}
