"use client";
import { useContext } from "react";
import { NavbarContext } from "./NavbarContext";
import { MdNotifications, MdMenu, MdSearch } from "react-icons/md";
import NavbarBrand from "./NavbarBrand";
import NavbarSearch from "./NavbarSearch";
import NavbarActions from "./NavbarActions";

const Navbar = () => {
  const { toggleSidebar } = useContext(NavbarContext);

  return (
    <div className="p-5 rounded-lg bg-gray-100 flex justify-between items-center capitalize text-lg font-bold">
      <button className="text-gray-600" onClick={toggleSidebar}>
        <MdMenu size={24} />
      </button>

      <NavbarBrand />

      <div className="flex items-center gap-5">
        <NavbarSearch />
        <NavbarActions />
      </div>
    </div>
  );
};

export default Navbar;
