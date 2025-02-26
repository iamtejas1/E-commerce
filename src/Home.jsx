import { useState } from "react";
import Axios from 'axios';

export const Home = () => {
    const [data, setData] = useState({
        pName: '',
        pBrand: '',
        pPrice: '',
        pProcessor: '',
        pCategory: '',
        pImage: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const dataHandler = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const imageHandler = (e) => {
        const file = e.target.files[0];
        setData(prev => ({ ...prev, pImage: file }));
    };

    const saveForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Convert image to base64 if it exists
            let imageBase64 = null;
            if (data.pImage) {
                imageBase64 = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(data.pImage);
                });
            }

            // Prepare JSON data
            const jsonData = {
                pName: data.pName,
                pBrand: data.pBrand,
                pPrice: data.pPrice,
                pProcessor: data.pProcessor,
                pCategory: data.pCategory,
                pImage: imageBase64
            };

            // Make API call and use the response
            const response = await Axios.post('http://localhost:3000/Products', jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Check response status and data
            if (response.status === 201 || response.status === 200) {
                // Reset form
                setData({
                    pName: '',
                    pBrand: '',
                    pPrice: '',
                    pProcessor: '',
                    pCategory: '',
                    pImage: null
                });
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            } else {
                throw new Error('Unexpected response from server');
            }

        } catch (err) {
            setError(err.response?.data?.message || err.message || 'An error occurred while submitting the form');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="container">
                <form onSubmit={saveForm}>
                    <div className="row fw-bold bg-black text-white mt-5">
                        <div className="text-center col-md-12">
                            <div className="fs-3 my-5 bg-info text-white align-content-center" style={{height: "80px"}}>
                                Product Information
                            </div>
                        </div>
                        
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Product Name</label>
                                <input 
                                    type="text" 
                                    name="pName" 
                                    onChange={dataHandler} 
                                    value={data.pName} 
                                    className="form-control my-3" 
                                    placeholder="Enter Product Name" 
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Product Brand</label>
                                <input 
                                    type="text" 
                                    name="pBrand" 
                                    onChange={dataHandler} 
                                    value={data.pBrand} 
                                    className="form-control my-3" 
                                    placeholder="Enter Product Brand" 
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Product Price</label>
                                <input 
                                    type="number" 
                                    name="pPrice" 
                                    onChange={dataHandler} 
                                    value={data.pPrice} 
                                    className="form-control my-3" 
                                    placeholder="Enter Product Price" 
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Product Processor</label>
                                <input 
                                    type="text" 
                                    name="pProcessor" 
                                    onChange={dataHandler} 
                                    value={data.pProcessor} 
                                    className="form-control my-3" 
                                    placeholder="Enter Product Processor" 
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Choose Product Category</label>
                                <select 
                                    className="form-control my-3" 
                                    name="pCategory" 
                                    onChange={dataHandler} 
                                    value={data.pCategory}
                                    required
                                >
                                    <option value="">_Select_</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Mens">Mens</option>
                                    <option value="Women">Women</option>
                                    <option value="Fruits-Vegitables">Fruits-Vegitables</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="pImage">Product Image</label>
                                <input 
                                    type="file" 
                                    name="pImage" 
                                    onChange={imageHandler} 
                                    className="form-control my-3" 
                                    accept="image/*"
                                />
                                {data.pImage && (
                                    <img 
                                        src={URL.createObjectURL(data.pImage)} 
                                        alt="Preview" 
                                        style={{ maxWidth: '200px', marginTop: '10px' }}
                                    />
                                )}
                            </div>
                        </div>

                        {error && <div className="alert alert-danger my-3">{error}</div>}
                        {success && <div className="alert alert-success my-3">Product saved successfully!</div>}

                        <div className="my-4">
                            <button 
                                className="btn btn-lg btn-success" 
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};