import { useEffect, useState } from "react";
import { useParams } from "react-router";
import inputAreas from "../assets/styles/createInputClasses";
import { ProductInterface } from "../models/product";
import products_services from "../services/product";
import DollarIcon from "../components/icons/dollarIcon";

// /product/id 

const loadingIMG = require('../assets/loading.png')


function Product() {

 const id = useParams().id;
 const [data, setData] = useState<ProductInterface>({})
 const [loading, setLoading] = useState(true)
 useEffect(
    ()=> {
        // get spesific product
        const getProduct = () => 
        {
            setLoading(true)
            products_services.getProduct(id!).then(
                (res) => {setData(res); setLoading(false)}
            )
        }
        getProduct()
    }, []
 )
  return (
    <div className="md:px-20">
        <div className="md:flex md:flex-row mt-10 pt-2">
            <div className="md:w-1/4 rounded-xl">
                {
                    !loading && 
                    <img className="rounded-xl transition-all" src={data.avatar}></img>
                }
                {
                    loading && 
                    <img className="rounded-xl w-full h-60 bg-white transition-all" src={loadingIMG}></img>
                }

            </div>
            <div className="w-3/4 flex flex-col justify-between align-start text-left px-10 pt-1 mt-5 md:mt-0">
                {
                    loading && 
                    <h1 className="font-semibold text-5xl transition-all">                </h1>
                }
                <h1 className="font-semibold text-5xl transition-all">{data.name}</h1>
                <div className="font-semibold text-lg flex flex-row gap-1 align-middle text-center mt-3 md:mt-0">
                    <DollarIcon />
                    {
                        !loading && 
                        <h2 className="font-semibold text-2xl transition-all">{data.price}</h2>

                    }
                    
                </div>
            </div>
        </div>
        <hr className="mx-2 my-8" />
        <div className="text-left mb-3">
            <h2 className="pb-3 font-semibold text-2xl">Description</h2>
            <span>
                {data.description}
            </span>
        </div>
    </div>
  );
}

export default Product;