import React, { useEffect, useState } from 'react'
import {useParams, useNavigate} from "react-router-dom"

const UpdateProduct = () => {

    const [name,setName]=useState("")
    const [price,setPrice]=useState("")
    const [category,setCategory]=useState("")
    const [company,setCompany]=useState("")
    const params=useParams()
    const navigate=useNavigate();

    const updateProduct= async ()=>{
        console.log(name, category,company,price);
        let result= await fetch(`http://localhost:3000/products/${params.id}`,{
          method:"Put",
          body:JSON.stringify({name, category,company,price}),
          headers:{
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        })
        result = await result.json();
        console.log(result);
        navigate("/")
    }

    useEffect(()=>{
      console.log(params);
      getProductDetail();
    },[])

    const getProductDetail=async ()=>{
        let result=await fetch(`http://localhost:3000/products/${params.id}`,{
          headers:{
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        })
        result = await result.json();
        console.log(result);
        setName(result.name);
        setCategory(result.category);
        setCompany(result.company);
        setPrice(result.price);
    }
  return (
    <div className='product'>
        <input type='text' placeholder='Enter Product Name' className='inputBox' value={name} onChange={(e)=>{setName(e.target.value)}} />

        <input type='text' placeholder='Enter Product Price' className='inputBox' value={price} onChange={(e)=>{setPrice(e.target.value)}} />

        <input type='text' placeholder='Enter Product Category' className='inputBox' value={category} onChange={(e)=>{setCategory(e.target.value)}} />

        <input type='text' placeholder='Enter Product Company' className='inputBox' value={company} onChange={(e)=>{setCompany(e.target.value)}} />

        <button className='signup-btn ' onClick={updateProduct}>Update Product</button>
    </div>
    
  )
}

export default UpdateProduct