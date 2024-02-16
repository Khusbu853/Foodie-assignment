import { useState } from "react";
import HungryHeartLogo from "../assets/Images/hungry_heart_logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { useSelector } from "react-redux";
import { HiMenu, HiOutlineArrowNarrowRight } from "react-icons/hi";

const Title = () => (
  <a href="/">
    <img style={{height:"30px", width:"50px", marginLeft:"20px"}}
      className="h-16 md:h-24 lg:h-36 drop-shadow-lg scale-125 md:scale-150"
      src={HungryHeartLogo}
      alt="Hungry Heart Logo"
    />
  </a>
);

const Header = ({ setIsLoggedIn }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate('')
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for the mobile menu

  const isOnline = useOnline();

  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    <div className="flex justify-between items-center shadow-xl bg-gradient-to-r from-lime-500 via-lime-300 to-lime-500 rounded-lg m-4 sticky top-0 z-50">
      <Title />
      <div className="nav font-semibold text-xs relative lg:text-lg md:text-md xl:text-2xl">
        {/* Hamburger menu */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 focus:outline-none"
          >
            <HiMenu className="h-6 w-6" />
          </button>
        </div>
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } max-sm:absolute max-sm:top-14 max-sm:w-40 max-sm:p-4 max-sm:bg-slate-100 max-sm:rounded-md sm:flex py-2 gap-1 md:gap-2 lg:gap-4 font-normal transition-all duration-150`}
          onClick={() => setIsMenuOpen(false)}
        >
          <Link to="/home">
            <li className="px-2 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="px-2 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
              About
            </li>
          </Link>
          <Link to="/contact">
            <li className="px-2 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
              Contact
            </li>
          </Link>
          <Link to="/instamart">
            <li className="px-2 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
              Instamart
            </li>
          </Link>
          <Link to="/help">
            <li className="px-2 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
              Help
            </li>
          </Link>
          <Link to="/cart">
            <li className="border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
              <i className="fa-solid fa-cart-shopping px-2"></i>
              Cart - {cartItems.length} items
            </li>
          </Link>
        </ul>
      </div>

      <div className="flex max-sm:pl-2 sm:gap-3 md:gap-6 lg:gap-12 justify-start items-center">
        <a
          href="#_"
          class="whitespace-nowrap max-sm:mx-2 p-1 md:px-2.5 md:py-1.5 lg:px-5 lg:py-2.5 font-medium bg-white text-blue-500 rounded-lg text-sm cursor-default"
        >
          {isOnline ? "✅ " + "Online" : "🔴 " + "Offline"}
        </a>


        
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login")
          }}
          className="text-xs sm:text-sm md:text-md lg:text-2xl font-semibold mr-2 sm:mr-4"
        >
        Logout
        </button>
         
      </div>
    </div>
  );
};

export default Header;
