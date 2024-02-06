import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Products = () => {
    const [productId, setId] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        Load();
    }, []);

    async function Load() {
        try {
            const result = await axios.get("http://localhost:8080/api/product/");
            setProducts(result.data);
        } catch (error) {
            console.error("Error loading products:", error);
        }
    }

    async function addProduct(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/product/save", {
                productName,
                productImage,
                productPrice: parseFloat(productPrice), // Convert to float if necessary
                stockQuantity: parseInt(stockQuantity), // Convert to integer
                category
            });
            alert("Product added successfully");
            clearForm();
            Load();
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Product registration failed");
        }
    }

    function clearForm() {
        setId("");
        setProductName("");
        setProductPrice("");
        setProductImage("");
        setStockQuantity("");
        setCategory("");
    }

    async function updateProduct(event) {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8081/api/product/update/${productId}`, {
                productName,
                productImage,
                productPrice: parseFloat(productPrice), // Convert to float if necessary
                stockQuantity: parseInt(stockQuantity), // Convert to integer
                category
            });
            alert("Product updated successfully");
            clearForm();
            Load();
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Product update failed");
        }
    }

    async function deleteProduct(productId) {
        try {
            await axios.delete(`http://localhost:8080/api/product/delete/${productId}`);
            alert("Product deleted successfully");
            Load();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Product delete failed");
        }
    }

    return (
        <div>
            <h1>Product Details</h1>
            <div className="container mt-4">
                <form>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" className="form-control" value={productName} onChange={(event) => setProductName(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Product Price</label>
                        <input type="text" className="form-control" value={productPrice} onChange={(event) => setProductPrice(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Product Image</label>
                        <input type="text" className="form-control" value={productImage} onChange={(event) => setProductImage(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Stock Quantity</label>
                        <input type="text" className="form-control" value={stockQuantity} onChange={(event) => setStockQuantity(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input type="text" className="form-control" value={category} onChange={(event) => setCategory(event.target.value)} />
                    </div>
                    <button className="btn btn-primary mt-4" onClick={addProduct}>Register</button>
                    <button className="btn btn-warning mt-4" onClick={updateProduct}>Update</button>
                </form>
            </div>
            <br />
            <table className="table table-dark" align="center">
                <thead>
                    <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Price</th>
                        <th scope="col">Product Image</th>
                        <th scope="col">Stock Quantity</th>
                        <th scope="col">Category</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.productName}</td>
                            <td>{product.productPrice}</td>
                            <td>{product.productImage}</td>
                            <td>{product.stockQuantity}</td>
                            <td>{product.category}</td>
                            <td>
                                <button type="button" className="btn btn-warning" onClick={() => updateProduct(product)}>Edit</button>
                                <button type="button" className="btn btn-danger" onClick={() => deleteProduct(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
