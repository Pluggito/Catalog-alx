import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "./Loader";

interface NavbarProps {
 
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const Navbar = ({  setVisible }: NavbarProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] =  useState(false);

    const handleCartNavigation = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/cart");
      setLoading(false);
    }, 5000);
  };

  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const cartCount = cartItems.reduce((t, i) => t + i.quantity, 0);

  return (
    <>
     {loading && <Loader />}
      {/* NAVBAR */}
      <div className="flex items-center justify-between py-5 font-medium">
        {/* LOGO */}
        <Link to="/">
          <h1 className="font-semibold text-lg">UrbanThread</h1>
        </Link>

        {/* DESKTOP NAV */}
        <ul className="hidden sm:flex gap-5 text-sm text-gray-600">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-2/4 h-[1.5px] border-none bg-gray-700 opacity-0 group-hover:opacity-100 transition" />
          </NavLink>

          <NavLink to="/collections" className="flex flex-col items-center gap-1">
            <p>COLLECTIONS</p>
            <hr className="w-2/4 h-[1.5px] border-none bg-gray-700 opacity-0" />
          </NavLink>

          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-2/4 h-[1.5px] border-none bg-gray-700 opacity-0" />
          </NavLink>

          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-2/4 h-[1.5px] border-none bg-gray-700 opacity-0" />
          </NavLink>
        </ul>

        {/* ICONS */}
        <div className="flex items-center gap-6">
          

          <div onClick={handleCartNavigation} className="relative">
            <FontAwesomeIcon icon={faCartPlus} className="text-[20px]" />
            <p className="absolute left-[15px] top-[-7px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {cartCount}
            </p>
          </div>

          {/* MOBILE MENU ICON */}
          <Menu
            className="sm:hidden cursor-pointer"
            onClick={() => setVisible(true)}
          />
        </div>
      </div>

      {/* MOBILE SIDEBAR (separate from navbar layout) */}

    </>
  );
};

export default Navbar;
