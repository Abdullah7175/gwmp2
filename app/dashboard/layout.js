"use client";

import Navbar from "@/components/ui/Navbar"
import Footer, { FooterProvider } from "@/components/ui/footer";
import Image from "next/image"
import { usePathname } from "next/navigation";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavbarProvider } from "@/components/ui/NavbarContext";

import { AppSidebar } from "@/components/app-sidebar";
import { Bell, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";



export default function Layout({ children }) {
    const [success, setSuccess] = useState(false);


    const handleLogout = () => {
      // Remove JWT token from local storage
      localStorage.removeItem("jwtToken");
  
      // Expire the JWT token cookie
      document.cookie =
        "jwtToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  
      // Set success state to true
      setSuccess(true);
    };
  
    useEffect(() => {
      if (success) {
        // Redirect to login page when logout is successful
        window.location.href = '/login';
      }
    }, [success]);

    //if (pathname.includes("/dashboard/qrroute")) {
        // Directly return the children without any layout for qrroute
      //  return <>{children}</>;
   // }
    
    return (
        <SidebarProvider>
            <NavbarProvider>
            <AppSidebar />
            <main className="w-full">
                <div className="h-16 border-b w-full bg-gray-800 text-white flex items-center justify-between p-4 shadow-sm">
                    <div className="flex gap-4 items-center">
                        <SidebarTrigger />
                        <h1 className="text-2xl font-semibold hidden md:block">Ground Water Management Portal</h1>
                        <h1 className="text-2xl font-bold block md:hidden">GWMP</h1>
                    </div>
                    <div className="flex gap-4">
                        <Button onClick={handleLogout} variant="secondary" className="border px-3">
                            <LogOut className="w-5 h-5" />
                        </Button>
                        <Button variant="secondary" className="border px-3">
                            <Bell className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
                {children}
                <FooterProvider>
                        <Footer />
                    </FooterProvider>
                <Toaster />
            </main>
            </NavbarProvider>
        </SidebarProvider>
    );
}
