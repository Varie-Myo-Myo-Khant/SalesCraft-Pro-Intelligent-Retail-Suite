import React, { useState } from 'react'; 

function AddProduct () {
    const [productName, setProductName] = useState("");
    const [image,setImage]=useState(null)
    function convertToBase64(e) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result); // This will log the base64 encoded image data
            setImage(reader.result);
        };
        reader.onerror = (error) => {
            console.error('Error: ', error);
        };
    }

    return (
        <>
            {/* Add product form */}
            <div className="form-container">
                <form className="form category-form"  >
                    <div className="add-form">
                        <h1 className="new-product">Add Product</h1>
                    </div>

                    <div className="form-input">
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={productName}
                            name="productName" 
                            onChange={(e) => setProductName(e.target.value)}
                        /> 
                    </div>

                    <div className="form-input">
                        <input
                            type="file"
                            placeholder="Product Image"
                            accept="image/*"  
                            name="productImage"
                            onChange={convertToBase64}
                        />
                    </div>
                    {image==""||image==null?"":<img width={100} height={100} src={image}/>}
                    

                    <div className="form-input">
                        <button className="product-btn">Add Product</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddProduct;
