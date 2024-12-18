import { fetchA } from "@/models/data";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Scard1 = async () => {
  const catA = await fetchA();

  return (
    <Card className="bg-[#0c60de] p-6 max-w-[450px] hover:bg-[#bed4fa] transition-colors">
      <CardHeader>
        <CardTitle className="text-white">Cat-A</CardTitle>
        <CardDescription className="text-white text-2xl font-bold">{catA.length}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default Scard1;
