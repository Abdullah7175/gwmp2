import { fetchB } from "@/models/data";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Scard2 = async () => {
  const catB = await fetchB();

  return (
    <Card className="bg-[#027002] p-6 max-w-[450px] hover:bg-[#ccf8d1] transition-colors">
      <CardHeader>
        <CardTitle className="text-white">Cat-B</CardTitle>
        <CardDescription className="text-white text-2xl font-bold">{catB.length}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default Scard2;
