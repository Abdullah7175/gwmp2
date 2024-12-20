"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const CURRENT_YEAR = new Date().getFullYear();

export const FooterContext = React.createContext();

export function useFooter() {
  const context = React.useContext(FooterContext);
  if (!context) {
    throw new Error("useFooter must be used within a FooterProvider.");
  }
  return context;
}

export const FooterProvider = ({ children }) => {
  const footerData = React.useMemo(
    () => ({
      company: "Karachi Water and Sewerage Corporation",
      acronym: "KW&SC",
      message: "© All rights reserved.",
      year: CURRENT_YEAR,
    }),
    []
  );

  return (
    <FooterContext.Provider value={footerData}>
      {children}
    </FooterContext.Provider>
  );
};

const Footer = React.forwardRef(({ className, ...props }, ref) => {
  const { company, acronym, message, year } = useFooter();

  return (
    <footer
      ref={ref}
      className={cn("bg-gray-800 text-white text-center p-4", className)}
      {...props}
    >
      <TooltipProvider delayDuration={0}>
        <div className="flex flex-col items-center space-y-2">
          <Tooltip>
            <TooltipTrigger className="text-lg font-bold">{company}</TooltipTrigger>
            <TooltipContent>{acronym}</TooltipContent>
          </Tooltip>
          <Separator />
          <div>&copy; {year}</div>
          <div className="text-sm">{message}</div>
        </div>
      </TooltipProvider>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;

// Updated AppLayout to ensure the footer is positioned at the bottom of the page
export const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
