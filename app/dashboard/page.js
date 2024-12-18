//import { cards } from "../lib/data";
import LicenseeCard from "@/components/ui/licenseeCard";
import Scard1 from "@/components/ui/catA";
import Scard2 from "@/components/ui/catB";
import Scard3 from "@/components/ui/catC";
import Scard4 from "@/components/ui/catD";
import Scard5 from "@/components/ui/catE";
import Card2 from "@/components/ui/card2";
import Card3 from "@/components/ui/card3";
import Card4 from "@/components/ui/card4";
import Card5 from "@/components/ui/card5";
import Map from "@/components/ui/map";
import Rightbar from "@/components/ui/rightbar";


const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="flex-1 space-y-4">
        {/* Main cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LicenseeCard />
          <Card2 />
          <Card3 />
        </div>

        {/* Secondary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Scard1 />
            <Scard2 />
            <Scard3 />
            <Scard4 />
            <Scard5 />
          </div>
          <div className="space-y-4 grid grid-cols-2 mb-5">
            <Card4 />
            <Card5 />
          </div>
        </div>

        {/* Map */}
        <div className="container w-full pt-3">
          <Map />
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full md:w-1/3 mt-4 md:mt-0">
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;