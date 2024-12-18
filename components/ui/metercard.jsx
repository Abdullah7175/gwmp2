import { MdCardMembership } from "react-icons/md";

const MeterCard = ({ item }) => {
  return (
    <div className="bg-whitesmoke p-5 rounded-xl flex gap-5 cursor-pointer w-1/2 shadow-lg hover:bg-[#d5dce9]">
      <MdCardMembership size={20} />
      <div className="flex flex-col gap-5">
        <span className="text-xl font-semibold">Meter</span>
        <span className="text-2xl font-medium">0</span>
      </div>
    </div>
  );
};

export default MeterCard;
