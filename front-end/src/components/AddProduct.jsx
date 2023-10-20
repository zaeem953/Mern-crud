import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {

    const [name,setName]=useState("")
    const [price,setPrice]=useState("")
    const [category,setCategory]=useState("")
    const [company,setCompany]=useState("")
    const [error,SetError]=useState(false)
    const navigate=useNavigate();

    const addProduct= async ()=>{
        console.log("Hello")

        if(!name || !price ||!category ||!company){
            SetError(true);
            return false;
        }

        console.log(name,price,category,company);
        const userId=JSON.parse(localStorage.getItem("user"))._id;
        let result= await fetch("http://localhost:3000/add-product",{
            method:"post",
            body:JSON.stringify({name, price, category, company, userId}),
            headers:{
                "Content-Type":"application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json();
        console.log(result)
        navigate("/");
    }
  return (
    <div className='product'>
        <input type='text' placeholder='Enter Product Name' className='inputBox' value={name} onChange={(e)=>{setName(e.target.value)}} />
        {error && !name && <span className='invalid-input'>Enter Valid Name</span>}

        <input type='text' placeholder='Enter Product Price' className='inputBox' value={price} onChange={(e)=>{setPrice(e.target.value)}} />
        {error && !price && <span className='invalid-input'>Enter Valid Price</span>}

        <input type='text' placeholder='Enter Product Category' className='inputBox' value={category} onChange={(e)=>{setCategory(e.target.value)}} />
        {error && !category && <span className='invalid-input'>Enter Valid Category</span>}

        <input type='text' placeholder='Enter Product Company' className='inputBox' value={company} onChange={(e)=>{setCompany(e.target.value)}} />
        {error && !company && <span className='invalid-input'>Enter Valid Company</span>}

        <button className='signup-btn ' onClick={addProduct}>Add Product</button>
    </div>
    
    
  )
}

export default AddProduct