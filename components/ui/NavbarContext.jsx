import { createContext, useState } from "react";

export const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <NavbarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </NavbarContext.Provider>
  );
};
