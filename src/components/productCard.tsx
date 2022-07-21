import { useNavigate } from "react-router";
import { ProductInterface } from "../models/product";
import { useState } from "react";
import DollarIcon from './icons/dollarIcon';
import products_services from "../services/product";
function ProductCard({props}:{props:ProductInterface}) {
  const [showDelete, setShowDelete] = useState(false)

  // Navigation to product on click
  let navigate = useNavigate();
  const navigateToProduct = () => {
    navigate(
      '/product/'+props.id
    )
  }

  // hover X sign
  const toggleShowDelete = () => {
    setShowDelete(!showDelete)
  }
  // delete a product on click X
  const deleteItem = async (e:any) => {
    e.stopPropagation();
    await products_services.deleteProduct(props.id!);
    window.location.reload()
  }
  return (
    <div className="h-80 lg:w-1/5 md:w-1/4 sm:w-1/2 w-full hover:shadow rounded-lg p-2 cursor-pointer relative border-y-0" onClick={navigateToProduct} onMouseEnter={toggleShowDelete} onMouseLeave={toggleShowDelete}>
      {/* Deleting part */}
      {
        showDelete &&
        <div style={{width: "1.2rem", height: "1.2rem", borderRadius: "50%"}}
          className="bg-red text-center hover:opacity-70 absolute top-1 right-1 flex flex-col justify-center align-middle" onClick={deleteItem}
        >
          <div className="text-center">x</div>
        </div>
      }
      {/* Product details */}
      <div className="h-3/4  w-full bg-white shadow shadow-black rounded-lg overflow-hidden justify-center align-center flex my-auto p-2">
        <img className="h-2/3 w-full object-contain rounded-lg overflow-hidden my-auto rounded"  src={props.avatar} alt="" />
      </div>
      <div className="mt-2">
        <h6 className="font-semibold text-lg text-left px-1">{props.name}</h6>
        <div className="font-semibold text-lg flex flex-row gap-1 justify-center align-middle text-center">
          <DollarIcon />
          {props.price}
        </div>
      </div>
      
        
    </div>
  );
  }

export default ProductCard;