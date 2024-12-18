import { FaArrowUpFromWaterPump } from "react-icons/fa6";
import { fetchgallon } from "@/models/data";

const Card2 = async () => {
  const gallon = await fetchgallon();
  const formattedGallon =
    gallon?.gallon_sum != null
      ? (gallon.gallon_sum / 1_000_000).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " M"
      : "No data available";

  return (
    <div className="bg-[#f5f7fa] p-6 rounded-xl flex items-center justify-between w-full max-w-[450px] shadow-lg hover:bg-[#e4e9f2] transition-colors">
      <div className="flex items-center gap-3">
        <FaArrowUpFromWaterPump size={30} className="text-[#3f72af]" />
        <div className="flex flex-col">
          <span className="text-[#2b3d5b] font-semibold text-lg">Demand of GroundWater</span>
          <span className="text-[#3f72af] font-bold text-2xl">{formattedGallon} GPM</span>
        </div>
      </div>
    </div>
  );
};
export default Card2;