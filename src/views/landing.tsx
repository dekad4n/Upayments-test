import '../App.css';
import { useEffect, useState,useRef } from 'react';
import products_services from '../services/product';
import ProductCard from '../components/productCard';
import {FilterInterface} from '../models/productFilters';
import AddProductButton from '../components/buttons/addProductButton';
import { ProductInterface } from '../models/product';


const loadingAvatar = require('../assets/loading.png')
const loadingArray : Array<ProductInterface>= [{avatar: loadingAvatar}, {avatar: loadingAvatar}, {avatar: loadingAvatar}, {avatar: loadingAvatar}]  


function Landing() {

  const [products,setProducts] = useState<Array<ProductInterface>>([])
  const [categories,setCategories] = useState<Array<any>>([])
  const [filters, setFilters] = useState<FilterInterface>({search: '', category: ''})
  const [categoryShow, setCategoryShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)
  const selectEl = useRef<any>(null);

  useEffect(
    () =>
    {
        // get list of products
        const getItems = () =>
        {
            setLoading(true)
            products_services.getProducts(page, 8, filters.category, filters.search).then(
                (res) => {
                    setProducts(res)
                    setLoading(false)

                }
            )
            
        }
        getItems()
    }
    ,[filters,page]
  )
  useEffect(
    () =>
    {
        // get list of categories
        const getCategories = () =>
        {
            products_services.getCategories().then(
                (cats) => {
                    setCategories(cats)

                }
            )

        }
        getCategories()
    }
    ,[]
  )

  // handle gray -> black conversion when category is selected
  const changeColor = () =>
  {
    selectEl.current!.style.color += "black" 
  }
  // handle change category --> data
  const changeCategory = (event:any) => 
  {
    setPage(1)
    setFilters({search: filters.search, category: event.target.value})
    changeColor()
  }
  // handle change search
  const changeSearchedProducts = (event: any) => {
    setPage(1)
    setFilters({search: event.target.value, category: filters.category})
  }
  // handle if we are going to show categories
  const changeShow = () => {
    setCategoryShow(!categoryShow)
  }
  // handle pagination
  const changePagination = (i:number) => {
    if(page+i > 0 && (products.length === 8 || i < 0) )
    {
        setPage(page + i)
    }
  }
  
  return (
    <div className="sm:flex sm:flex-col items-center justify-center relative">
        {/* Filter part */}
        <div className="md:flex md:flex-row md:flex-grow w-full justify-between py-7 my-7">
            {/* Search */}
            <div className="md:w-2/5 rounded-lg shadow h-15 md:mt-0 ">
                <input className="w-full h-full rounded-lg shadow px-4
                py-1.5 placeholder:font-semibold "  onChange={changeSearchedProducts} placeholder="Apple Watch, Samsung S21, Macbook Pro..."></input>
            </div>
            {/* Categories */}
            <div className="md:w-1/4 rounded-lg shadow h-10 sm:mt-5 mt-3 md:mt-0 relative">
                <select 
                onClick={changeShow}
                onChange={changeCategory}
                ref={selectEl}
                defaultValue=""
                className="form-select appearance-none
                block
                w-full
                h-full
                px-4
                py-1.5
                text-base
                font-semibold
                text-gray
                bg-white bg-clip-padding bg-no-repeat
                rounded-lg
                transition
                ease-in-out
                shadow-black
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none 
                " aria-label="Categories">
                    
                    <option hidden disabled value="" className="text-gray-400">Categories</option>
                    {
                        categories.map(
                            (category,index) => 
                            {
                                return (<option key={"landing_category_"+ category.name + index.toString() }  style={{color:"black"}} value={category.name}>{category.name}</option>)
                            }
                        )
                    }
                    
                </select>
                {/* Dropdown-up arrows of categories */}
                {
                    !categoryShow &&
                    <span className="absolute top-2 right-5 cursor-pointer">▼</span>
                }
                {
                    categoryShow &&
                    <span className="absolute top-2 right-5 cursor-pointer">▲</span>
                }
            </div>
            
            
        </div>
        {/* Products */}
        <div className="lg:mx-20 lg:px-20 md:px-2 md:mx-2  w-full">
            <div className="flex flex-row flex-wrap lg:gap-10 md:gap-2 justify-center md:mx-20 mx-5 flex-grow transition-all">
            {
                Object.keys(products).length !== 0 && !loading ? 
                
                    products.map(
                        (item) => (<ProductCard key={"product_" + item.id} props={item} />)
                    )
                : null
            }
            {
                loading &&
                loadingArray.map(
                    (item, index) => (<ProductCard key={"temp_product_" + index.toString()} props={item} />)
                )
            }
            
        </div>
        </div>
        <AddProductButton />
        {/* Pagination */}
        <div className="flex flex-row gap-3 mb-5">
            <span onClick={() => changePagination(-1)} className="cursor-pointer hover:bg-gray rounded-full pt-0.5 bg-white w-8 h-8 text-center">&#8592;</span>
            {page}
            <span onClick={() => changePagination(+1)}  className="cursor-pointer hover:bg-gray pt-0.5 bg-white rounded-full w-8 h-8 text-center  ">&#8594;</span>
        </div>
    </div>
  );
}

export default Landing;
