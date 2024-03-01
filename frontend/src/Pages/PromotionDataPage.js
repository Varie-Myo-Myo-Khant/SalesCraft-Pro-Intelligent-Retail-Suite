import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPromotionData } from '../Slice/analysisSlice';
import { Col, Row, Table } from 'react-bootstrap';
import { getProducts } from "../Slice/productSlice";

export const PromotionDataPage = () => {

    const dispatch = useDispatch();
    const { promotionData, loading, error } = useSelector(state => state.analysis);
    const { products } = useSelector((state) => state.product);
     const [topPairs, setTopPairs] = useState([]);

    useEffect(() => {
        dispatch(getProducts());
        dispatch(fetchPromotionData());
    }, [dispatch]);

 useEffect(() => {
    if (promotionData && promotionData.length > 0) {
        const uniqueIdLists = new Set();
        const transformData = [];
        promotionData.forEach(rule => {
            const antecedentIds = rule.antecedent;
            const consequentIds = rule.consequent;
            const confidence = rule.confidence;

            // Concatenate and sort the array of IDs
            const sortedIds = [...antecedentIds, ...consequentIds].sort();

            // Check if the sortedIds already exist in uniqueIdLists
            const key = sortedIds.join(',');
            if (!uniqueIdLists.has(key)) {
                uniqueIdLists.add(key);
                transformData.push({
                    id: sortedIds,
                    confidence: confidence
                });
            }
        });

       // Sort transformData based on confidence
        transformData.sort((a, b) => b.confidence - a.confidence);

        // Take only the top 5 elements
        const top5TransformData = transformData.slice(0, 5);

        // Sort the top based on id list length

        top5TransformData.sort((a,b)=>b.id.length - a.id.length) 
        setTopPairs(top5TransformData);
    }
}, [promotionData]);


   const getProductNameById = (productId) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            return products[i].productName;
        }
    }
    return 'Product not found';
};

    const getProductImageById = (productId) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            return products[i].productImage;
        }
    }
    return ''; // Return empty string if product image not found
};


  return (
    <>
                {topPairs.map((pair, index) => (
                <Row key={index}>
                   
                        {/* Assuming getProductImageById and getProductNameById functions are defined */}
                        {pair.id.map((productId, idx) => (
                            <Col md="auto" key={idx}>
                               
                                <img className="addsmallimage" src={getProductImageById(productId)} alt={getProductNameById(productId)} />
                                <h4>{getProductNameById(productId)}</h4>
                            </Col>
                        ))}
                    
                </Row>
            ))}
           
      
    </>
);
};
