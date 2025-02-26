import { MdDelete } from "react-icons/md";
import { FaRegEdit,FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import Axios from 'axios'
import { NavLink } from "react-router-dom";

const ProductData = () => {

     const [data, setData]=useState([])
    useEffect(()=>{

        loadData()

    },[])

    const loadData = async() => {

        const result =  await Axios.get('http://localhost:3000/Products')
        setData(result.data)
        console.log(result.data)
    }

    const deleteProduct = async(id) => {
        
        
        var result=data.filter((val)=> val.id !== id )

        setData(result)

        await Axios.delete(`http://localhost:3000/Products/${id}`)
    }
  return (
    <div className=" container-fluid d-flex flex-wrap justify-content-center  gap-5 mt-5">
        {
            data.map((val , index )=>{
                return(
                <div className="card w-25"key={index} >
                    <div className="card-header">
                        <div>{val.pName}</div>
                    </div>
                    <div className="card-body">
                        <img
                            src={val.pImage}
                            alt={val.pName}
                            style={{ width: "100%", height: "200px", objectFit: "cover" }}
                            className="mb-3"
                        />
                        <div>Brand: {val.pBrand}</div>
                        <div>Price: {val.pPrice}</div>
                        <div>Processor: {val.pProcessor}</div>
                        <div>Category: {val.pCategory}</div>
                       
                    </div>
                    <div className="card-footer d-flex gap-3">
                        <button className="icon-link-hover shadow rounded-1" onClick={()=>{if(window.confirm('Are you sure ?')) deleteProduct(val.id)}} style={{backgroundColor:"red",width:"40px", height:"40px"}} >< MdDelete/> </button>
                        <NavLink to={`/edit/${val.id}`}>
                        <button className="icon-link-hover shadow rounded-1" style={{backgroundColor:"green",width:"40px", height:"40px"}}><FaRegEdit/></button>
                        </NavLink>
                        <button className="icon-link-hover shadow rounded-1" style={{backgroundColor:"blue",width:"40px", height:"40px"}}><FaShoppingCart/></button>
                    </div>
                </div>
                )
            })
        }
    </div>
  )
}

export default ProductData