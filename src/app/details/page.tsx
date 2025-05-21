"use client"

import { cn } from "@/lib/utils";
import Gauge from "@/src/components/gauge";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";

const Details = () => {

  const [temperature, setTemperature] = useState<number>(0);

  const maxTemperature = 45;

  return (
    <main className="p-5">
      <div className="bg-primary/10 rounded-full w-[300px] h-[300px] mx-auto flex justify-center items-center">
        <Image className="pb-5" width={170} height={170} src="/samambaia.png" alt="Samambaia" />
      </div>
      <h1 className="mt-5 font-bold text-2xl text-primary text-center">Samambaia</h1>
      <section className="flex gap-10">
        <Gauge gaugeValue={temperature} maxGaugeValue={maxTemperature} gaugeType="humidity"/>
      </section>
    </main>
  )
};

export default Details;
