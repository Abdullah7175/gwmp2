import { MdSearch } from "react-icons/md";

const NavbarSearch = () => (
  <div className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg">
    <MdSearch />
    <input
      type="text"
      placeholder="Search..."
      className="bg-transparent outline-none text-gray-700 placeholder-gray-500"
    />
  </div>
);

export default NavbarSearch;
