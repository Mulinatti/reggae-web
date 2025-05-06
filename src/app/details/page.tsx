"use client"

import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";

const Details = () => {

  const [heat, setHeat] = useState<number>(0);

  const increaseHeat = () => {
    setHeat(heat + 10);
    console.log(heat);
  }

  return (
    <main className="p-5">
      <div className="bg-primary/10 rounded-full w-[300px] h-[300px] mx-auto flex justify-center items-center">
        <Image className="pb-5" width={170} height={170} src="/samambaia.png" alt="Samambaia"/>
      </div>
      <h1 className="mt-5 font-bold text-2xl text-primary text-center">Samambaia</h1>
      <section>
        <div className="neumorphism w-28 h-28 flex justify-center items-center relative">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-800 to-red-900 rounded-full flex justify-center items-center">
            <div className="w-20 h-20 bg-background rounded-full flex justify-center items-center">
              <p className="font-bold text-xl ml-1">27°</p>
            </div>
          </div>
          <div className={`absolute top-0 h-full rotate-[26deg]`}>
            <div className="bg-white border w-2 h-6 rounded-full"></div>
          </div>
        </div>
        <Button onClick={increaseHeat} className="mt-4">Increase Heat</Button>
      </section>
    </main>
  )
};

export default Details;
