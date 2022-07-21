import { useState } from "react";
import "../../assets/styles/addProduct-css.css"
import { Navigate } from "react-router-dom";
function AddProductButton() {

  const [nav, setNav] = useState(false)
  // navigate
  const navigateAddProduct = () =>{
    setNav(true)
  }
  return (
    <div className="fixed bottom-5 right-5 circle font-bold text-white text-5xl cursor-pointer" onClick={navigateAddProduct}>
    +
    {
        nav && 
        <Navigate to="/add-product" replace={true} />

    }
    </div>
  );
}

export default AddProductButton;