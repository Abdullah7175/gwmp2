import Image from "next/image";
import MeterCard from "./metercard";

const Rightbar = () => {
  return (
    <div className="sticky flex flex-col gap-2.5">
      <div className="bg-gradient-to-t from-[#c0ceea] to-[#253352] h-full p-5 rounded-lg relative">
        <div className="absolute right-0 bottom-0 sm:w-1/2 sm:h-1/2">
          <Image className="object-contain opacity-10" src="/kl.png" alt="" fill />
        </div>
        <div className="flex flex-col gap-6 mt-3">
          <span className="font-bold text-white text-2xl mt-6">Live Meter Readings</span>
          
         <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 z-10">
            <MeterCard />
            <MeterCard />
            <MeterCard />


          
            <MeterCard />
            <MeterCard />
            <MeterCard />
         

            <MeterCard />
            <MeterCard />
            <MeterCard />
        

         
            <MeterCard />
            <MeterCard />
            <MeterCard />
      

          
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
