import Image from "next/image";
import MeterCard from "./metercard";

const Rightbar = () => {
  return (
    <div className="sticky flex flex-col gap-2.5">
      <div className="bg-gradient-to-t from-[#c0ceea] to-[#253352] p-5 rounded-lg mb-5 relative">
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2">
          <Image className="object-contain opacity-20" src="/kl.png" alt="" fill />
        </div>
        <div className="flex flex-col gap-6">
          <span className="font-bold text-white">Live Meter Readings</span>
          
          <div className="flex gap-3.5 justify-between">
            <MeterCard />
            <MeterCard />
            <MeterCard />
          </div>

          <div className="flex gap-3.5 justify-between">
            <MeterCard />
            <MeterCard />
            <MeterCard />
          </div>

          <div className="flex gap-3.5 justify-between">
            <MeterCard />
            <MeterCard />
            <MeterCard />
          </div>

          <div className="flex gap-3.5 justify-between">
            <MeterCard />
            <MeterCard />
            <MeterCard />
          </div>

          <div className="flex gap-3.5 justify-between">
            <MeterCard />
            <MeterCard />
            <MeterCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
