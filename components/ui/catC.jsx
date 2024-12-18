import { fetchC } from "@/models/data";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Scard3 = async () => {
  const catC = await fetchC();

  return (
    <Card className="bg-[#f5f7fa] p-6 max-w-[450px] hover:bg-[#e4e9f2] transition-colors">
      <CardHeader>
        <CardTitle className="text-[#2b3d5b]">Cat-C</CardTitle>
        <CardDescription className="text-[#3f72af] font-bold text-2xl">{catC.length}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default Scard3;