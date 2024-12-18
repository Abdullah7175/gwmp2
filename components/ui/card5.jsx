import { GiWaterTank } from "react-icons/gi";
import { fetchtanks } from "@/models/data";

const Card5 = async () => {
  const tanks = await fetchtanks();

  return (
    <div className="bg-[#f5f7fa] p-6 rounded-xl flex items-center justify-between w-full max-w-[450px] shadow-lg hover:bg-[#e4e9f2] transition-colors">
      <div className="flex items-center gap-3">
        <GiWaterTank size={30} className="text-[#3f72af]" />
        <div className="flex flex-col">
          <span className="text-[#2b3d5b] font-semibold text-lg">Total Storage Tanks</span>
          <span className="text-[#3f72af] font-bold text-2xl">{tanks.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Card5;