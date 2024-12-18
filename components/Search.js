"use client";

import { MdSearch } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Search = ({ placeholder }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Update the URL with the search query
      router.replace(`?search=${searchTerm}`);
    }, 500); // Debounce to avoid rapid calls

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, router]);

  return (
    <div className="flex items-center gap-2.5 bg-[#e8eff5] p-2.5 rounded-lg max-w-max">
      <MdSearch />
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="bg-transparent border-none text-[#2b3d5b] outline-none"
      />
    </div>
  );
};

export default Search;
