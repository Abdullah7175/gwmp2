import { GiWell } from "react-icons/gi";
import { fetchborescount } from "@/models/data";

const Card3 = async () => {
  const bores = await fetchborescount();

  // Calculate live and proposed bore counts
  const liveBoresCount = bores.filter(bore => bore.number_of_bores === "BORE").length;
  const wellCount = bores.filter(bore => bore.number_of_bores === "WELL").length;
  const proposedBoresCount = bores.filter(bore => bore.number_of_bores === "PROPOSED").length;

  return (
    <div className="bg-[#f5f7fa] p-6 rounded-xl flex items-center justify-between w-full max-w-[450px] shadow-lg hover:bg-[#e4e9f2] transition-colors">
      <div className="flex items-center gap-3">
        <GiWell size={30} className="text-[#3f72af]" />
        <div className="flex flex-col">
          <span className="text-[#2b3d5b] font-semibold text-lg">Total Bore Count</span>
          <span className="text-[#3f72af] font-bold text-2xl">{bores.length}</span>
        </div>
      </div>
      <div className="flex flex-col text-right gap-2">
        <span className="text-[#5f6a8a] font-semibold text-sm">BORES: {liveBoresCount}</span>
        <span className="text-[#5f6a8a] font-semibold text-sm">WELLS: {wellCount}</span>
        <span className="text-[#5f6a8a] font-semibold text-sm">Proposed: {proposedBoresCount}</span>
      </div>
    </div>
  );
};

export default Card3;