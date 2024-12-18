import { MdLocationOn } from "react-icons/md";
import { fetchborescount } from "@/models/data";

const Card4 = async () => {
  const bore = await fetchborescount();

  return (
    <div className="bg-[#f5f7fa] p-6 rounded-xl flex items-center justify-between w-full max-w-[450px] shadow-lg hover:bg-[#e4e9f2] transition-colors">
      <div className="flex items-center gap-3">
        <MdLocationOn size={30} className="text-[#3f72af]" />
        <div className="flex flex-col">
          <span className="text-[#2b3d5b] font-semibold text-lg">Total Locations</span>
          <span className="text-[#3f72af] font-bold text-2xl">{bore.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Card4;