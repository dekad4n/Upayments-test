import { useEffect, useState, useRef } from "react";
import inputAreas from "../assets/styles/createInputClasses";
import products_services from "../services/product";
import { useNavigate } from "react-router-dom";

function AddProduct() {

 const [categories, setCategories] = useState<Array<any>>([])
 const [categoryShow, setCategoryShow] = useState(false);
 const selectEl = useRef<any>(null);

  useEffect(
    // get all possible categories
    function getCategories () {
        products_services.getCategories().then(
            (cats) => {
                setCategories(cats)
            }
        )
    }
    
    ,[])
  let navigate = useNavigate();
//   Handle arrow rotation
  const changeShow = () => {
    setCategoryShow(!categoryShow)
  }
  const navigateHome = () => {
    navigate(
      '/'
    )
  }
//   Handle creating product
  const submitForm = async (event:any) =>{
    event.preventDefault()
    // additional check needed since our default value for select is not null
    if(event.target[3].value != "")
    {
        let data = [event.target[0].value,event.target[1].value,event.target[2].value,event.target[3].value,event.target[4].value]
        const res = await products_services.addProduct(data[0],data[1],data[2],data[3],data[4])
        navigateHome()

    }
    else{
        selectEl.current!.style.border += "1px solid red" 
    }
    

  }
//   Handle category gray --> black conversion
  const changeColor = () =>
  {
    selectEl.current!.style.color += "black" 
  }
  return (
    <form onSubmit={submitForm} className="flex flex-col place-items-center gap-5 justify-center align-middle pt-20">
        <h1 className="font-semibold text-3xl pb-5">Create Product</h1>
        {/* Target 0, name input */}
        <input required className={inputAreas}  placeholder="Product name"></input>
        {/* Target 1, description input */}
        <textarea required  className="lg:w-2/5 md:w-1/2 sm:w-3/4 w-full h-full rounded-lgshadow px-5
        py-2.5 placeholder:font-semibold"   placeholder="Description" rows={3} style={{resize:"none"}}></textarea>
        {/* Target 2, imageURL input */}
        <input required className={inputAreas}     placeholder="Image URL"></input>
        {/* Target 3, category input */}
        <div className="lg:w-2/5 md:w-1/2 sm:w-3/4 w-full rounded-xl shadow h-10 relative">
                <select 
                ref={selectEl}
                onClick={changeShow}
                onChange={changeColor}
                defaultValue=""
                className="form-select appearance-none
                block
                w-full
                h-full
                px-4
                py-1.5
                text-base
                text-gray
                bg-white bg-clip-padding bg-no-repeat
                rounded-lg
                transition
                ease-in-out
                shadow-black
                font-semibold
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Category">
                    <option hidden disabled value="" className="text-gray-400">Category</option>
                    {
                        categories.map(
                            (category, index) => 
                            {
                                return (<option key={"category_add"+ category.name  + index.toString()} style={{color:"black"}}  value={category.name}>{category.name}</option>)
                            }
                        )
                    }
                    
                </select>
                {/* Arrow of category */}
                {
                    !categoryShow &&
                    <span className="absolute top-2 right-5 cursor-pointer">▼</span>
                }
                {
                    categoryShow &&
                    <span className="absolute top-2 right-5 cursor-pointer">▲</span>
                }
            </div>
        {/* Target 4, price input */}
        <input required className={inputAreas}     placeholder="Price"></input>
        {/* Submit button */}
        <button className="sm:w-2/5 w-3/4 h-full rounded-lg shadow px-5
        py-2.5 bg-white font-bold mt-3">
            SUBMIT
        </button>
    </form>
  );
}

export default AddProduct;

