import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Navbar() {
  // Navigation to home
  let navigate = useNavigate();
  const navigateHome = () => {
    navigate(
      '/'
    )
  }
  // Mobile look navbar
  const [show,setShow] = useState(false)
  const toggleRegister = () => 
  {
    setShow(!show)
  }
  return (
    <div className="rounded-lg bg-white">
      <div className="flex flex-row px-5 py-3 mt-10 justify-between w-full bg-white sm:rounded-lg shadow shadow-black">
        <h1 className="text-2xl italic font-bold cursor-pointer" onClick={navigateHome}>Upayments Store</h1>
        {/* For mobile arrow */}
        <h1 className="sm:hidden  text-3xl cursor-pointer" onClick={toggleRegister}>▾</h1>
        <h1 className="text-2xl italic font-bold cursor-pointer sm:block hidden">Register</h1>

        
      </div>
        {/* For mobile */}
        { show&&
          <div className="text-2xl italic font-bold cursor-pointer sm:hidden my-3 pb-3">Register</div>
        }
    </div>
    
  );
}

export default Navbar;