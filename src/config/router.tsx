import {
    Routes,
    Route
  } from "react-router-dom";
import Landing from "../views/landing";
import AddProduct from "../views/addProduct";
import Product from "../views/product";

// basic react dom router
export default function MainRouter()
{
  return (
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/add-product" element={<AddProduct />} />
      </Routes>
  );

}