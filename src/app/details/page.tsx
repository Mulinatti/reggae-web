import Image from "next/image";
import React from "react";

const Details = () => {
  return (
    <main className="p-5">
      <div className="bg-primary/10 rounded-full w-[300px] h-[300px] mx-auto flex justify-center items-center">
        <Image className="pb-5" width={170} height={170} src="/samambaia.png" alt="Samambaia"/>
      </div>
      <h1 className="mt-5 font-black text-2xl text-primary text-center">Samambaia</h1>
    </main>
  )
};

export default Details;
