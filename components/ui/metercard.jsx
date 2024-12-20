import { MdCardMembership } from "react-icons/md";

const MeterCard = ({ item }) => {
  return (
    <div className="bg-whitesmoke p-4 rounded-xl flex gap-1 cursor-pointer w-full shadow-lg hover:bg-[#d5dce9]">
      <MdCardMembership size={20} />
      <div className="flex flex-col gap-8">
        <span className="text-xl font-semibold -mt-1">Meter</span>
        <span className="text-2xl font-medium">0</span>
      </div>
    </div>
  );
};

export default MeterCard;
