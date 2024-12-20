import { MdCardMembership } from "react-icons/md";
import { fetchCustomer } from "@/models/data"; // Adjust the import path if necessary
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const LicenseeCard = async () => {
  const licenseeData = await fetchCustomer();

  return (
    <Card className="bg-[#f5f7fa] p-6 rounded-xl flex items-center justify-between w-full max-w-[450px] shadow-lg hover:bg-[#e4e9f2] transition-colors">
      <CardHeader className="flex items-center gap-3">
        <MdCardMembership size={30} className="text-[#2b3d5b]" />
        <div>
          <CardTitle>Total License Issued</CardTitle>
          <CardDescription className="text-[#3f72af] font-bold text-2xl">
            {licenseeData.length}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

export default LicenseeCard;