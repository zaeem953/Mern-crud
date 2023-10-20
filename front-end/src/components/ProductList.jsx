import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"

const ProductList = () => {
    const [products, setProducts] = useState([]);
//-----------------------------------------------------GET ALL PRODUCTS-----------------------------
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch("http://localhost:3000/products",{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json();
        setProducts(result);
    }
//----------------------------------------DELETE PRODUCTS-----------------------------------------------
    const deleteProduct=async (id)=>{
        let result = await fetch(`http://localhost:3000/products/${id}`,{
            method:"Delete",
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json();
        if(result){
            getProducts();
        }
    }

//------------------------------SEARCH---------------------------------------------------------------------

    const searchHandle=async (e)=>{
       let key=e.target.value;
       if(key){
        let result = await fetch(`http://localhost:3000/search/${key}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            } 
        });
        result = await result.json();
        if(result){
            setProducts(result)
        }
       }else{
        getProducts();
       }
       
    }

    return (
        <div className='product-list'>
            <h3>ProductList</h3>
            <input type='text' placeholder='Search Products' className='search-product-box' onChange={searchHandle}/>
            <ul>
                <li>S .No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Company</li>
                <li>Operations</li>
            </ul>
            {
                products.length>0 ? products.map((item,index) =>
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={()=>deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/"+item._id}>Update</Link>
                        </li>
                    </ul>
                )
                :
                <h4>No Result Found</h4>
            }
        </div>
    )
}

export default ProductList