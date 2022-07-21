import axios from "axios";
import mockapi from "../config/mockapi";

const URL =  mockapi.BACKEND_URL;

const headers = {
    data: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
    
};
// Listing Products
const getProducts = async (page = 1, limit = 8, categorys = "", search="")   =>
{
    let req = URL + "products/"
    
    try{
        const res = await axios.get(req, {
            params: {
                page: page,
                limit: limit,
                name: search === "" ? undefined : search,
                category:categorys === "" ? undefined : categorys
            },
            
        })
        console.log(res)
        return res.data
    }catch(e){
        return [] 
    }
}
// get spesific product details
const getProduct = async (id:string)   =>
{
    let req = URL + "products/"+id
    
    try{
        const res = await axios.get(req)
        console.log(res)
        return res.data
    }catch(e){
        return [] 
    }
}
// add a product
const addProduct = async (name:string, description:string, imageURL:string, category:string, price:string) =>
{
    let req = URL + "products/"
    try{
        // make add req
        const res = await axios.post(req, {
            name: name,
            description: description,
            avatar: imageURL,
            category:category,
            price:price,
            developerEmail: "gulbeysadi@gmail.com"
            
        })
        console.log(res)
        return res.data
    }catch(e){
        return [] 
    }

}
// delete product with id
const deleteProduct = async (id:string) =>
{
    let req = URL + "products/" + id
    try{
        // make add req
        const res = await axios.delete(req)
        console.log(res)
        return res.data
    }catch(e){
        return [] 
    }
}


// Listing Categories
const getCategories = async ()   =>
{
    let req = URL + "categories/"
    console.log(req)
    
    try{
        const res = await axios.get(req, headers)
        return res.data
    }catch(e){
        return [] 
    }
    
}


const products_services = {
    getProducts, getProduct, addProduct, deleteProduct, getCategories,
}

export default products_services;