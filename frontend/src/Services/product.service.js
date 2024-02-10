import http from "./baseURL";

class ProductService {
    // get all product
    getAll() {
        return http.get("/product/");
    }

    // get product by id
    get(id) {
        return http.get(`/product/${id}`);
    }

    // find product by name
    findByProductName(productName) {
        return http.get(`/product/serach?productName=${productName}`)
    }

    // create new product
    create(data) {
        return http.post("/product/", data);
    }

    // delete product by id
    delete(id) {
        return http.delete(`/product/${id}`)
    }

    // update the data
    update(id, data) {
        return http.put(`/product/${id}`, data);
    }
}

export default ProductService;
