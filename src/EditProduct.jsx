
import  Axios  from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

const EditProduct = () => {
 
  const {id}= useParams();

  const nav = useNavigate()

  const [data, setData]=useState({pName:'',pBrand:'',pPrice:'',pProcessor:'',pCategory:''})

  const dataHandler = (e) =>{
     
      setData({...data,[e.target.name]:e.target.value})
  }
  const fetchData = async() =>{

    const result= await Axios.get(`http://localhost:3000/Products/${id}`)

    // console.log(result.data)

    setData({pName: result.data.pName ,
      pBrand:result.data.pBrand,
      pPrice:result.data.pPrice,
      pProcessor:result.data.pProcessor,
      pCategory:result.data.pCategory
    });

   

  }

  useEffect(()=>{
    fetchData()
  },[])

  const saveForm = async(e) =>{
    e.preventDefault()

    await Axios.put(`http://localhost:3000/Products/${id}`,data)

    nav('/productdata')
  }
  return (
    <div>
        <div className="container">
            <form action="" onSubmit={(e)=>saveForm(e)}>
                <div className="row fw-bold bg-black text-white mt-5">
                    <div className="text-center col-md-12 ">
                        <div className="fs-3 my-5 bg-info text-white align-content-center" style={{height: "80px"}}>
                        Update Product 
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label htmlFor="">Update Product Name</label>
                            <input type="text" name="pName" onChange={(e)=>dataHandler(e)} value={data.pName} className="form-control my-3" placeholder="Enter Product Name" />
                        </div>
                        
                    </div>
                    <div className="col-md-6 ">
                        <div className="form-group">
                            <label htmlFor="">Update Product Brand</label>
                            <input type="text" name="pBrand" onChange={(e)=>dataHandler(e)} value={data.pBrand} className="form-control my-3" placeholder="Enter Product Brand" />
                        </div>
                    </div>
                    <div className="col-md-6 ">
                        <div className="form-group">
                            <label htmlFor="">Update Product Price</label>
                            <input type="number" name="pPrice" onChange={(e)=>dataHandler(e)} value={data.pPrice} className="form-control my-3" placeholder="Enter Product Price" />
                        </div>
                    </div>
                    <div className="col-md-6 ">
                        <div className="form-group">
                            <label htmlFor="">Update Product Processor</label>
                            <input type="text" name="pProcessor" onChange={(e)=>dataHandler(e)} value={data.pProcessor} className="form-control my-3" placeholder="Enter Product Processor" />
                        </div>
                    </div>
                    <div className="col-md-12 ">
                        <div className="form-group">
                            <label htmlFor=""> Choose Update Product Category</label>
                            <select className="form-control my-3" name="pCategory" onChange={(e)=>dataHandler(e)} value={data.pCategory}>
                                <option value="null">_Select_</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Mens">Mens</option>
                                <option value="Women">Women</option>
                                <option value="Fruits-Vegitables">Fruits-Vegitables</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="my-4" >
                        <button className="btn btn-lg btn-success">Submit</button>
                    </div>
                </div>

               
            </form>
        </div>
    </div>
  )
}

export default EditProduct