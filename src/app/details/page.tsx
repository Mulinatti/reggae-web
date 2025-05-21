"use client"

import { cn } from "@/lib/utils";
import Gauge from "@/src/components/gauge";
import { Button } from "@/src/components/ui/button";
import { Card, CardHeader } from "@/src/components/ui/card";
import { Citrus, Clock, Droplet, Flower, Flower2, Info, Snowflake, Sprout, Sun } from "lucide-react";
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
      <div className="text-center">
        <h1 className="mt-5 font-bold text-2xl text-primary">Samambaia</h1>
        <p className="text-xs text-zinc-500">1337021</p>
      </div>
      <section className="flex gap-10 justify-center mt-8">
        <div>
          <Gauge gaugeValue={temperature} maxGaugeValue={maxTemperature} gaugeType="temperature"/>
          <p className="text-center mt-2 text-zinc-700">Temperatura</p>
        </div>
        <div>
          <Gauge gaugeValue={temperature} maxGaugeValue={maxTemperature} gaugeType="humidity"/>
          <p className="text-center mt-2 text-zinc-700">Umidade</p>
        </div>
      </section>
      <section className="mt-2 p-8">
        <div className="flex gap-2 justify-center">
          <Info size={20} className="stroke-primary"/>
          <p className="text-zinc-700">Última irrigação 2h atrás</p>
        </div>
      </section>
      <hr></hr>
      <section className="space-y-4 p-8">
        <h2 className="text-center font-bold text-xl text-primary">Informações</h2>
        <div className="flex gap-2">
          <Card className="p-3 w-13">
            <CardHeader className="p-0 flex justify-center">
              <Flower size={28} className="stroke-rose-400"/>
            </CardHeader>
          </Card>
          <div>
            <p className="font-bold">Flora</p>
            <p className="text-zinc-600">Primavera</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Card className="p-3 w-13">
            <CardHeader className="p-0 flex justify-center">
              <Sprout size={28} className="stroke-emerald-600"/>
            </CardHeader>
          </Card>
          <div>
            <p className="font-bold">Colheita</p>
            <p className="text-zinc-600">Inverno</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Card className="p-3 w-13">
            <CardHeader className="p-0 flex justify-center">
              <Sun size={28} className="stroke-yellow-500"/>
            </CardHeader>
          </Card>
          <div>
            <p className="font-bold">Tempo de sol</p>
            <p className="text-zinc-600">4h</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Card className="p-3 w-13">
            <CardHeader className="p-0 flex justify-center">
              <Droplet size={28} className="stroke-blue-300 fill-blue-200"/>
            </CardHeader>
          </Card>
          <div>
            <p className="font-bold">Irrigação</p>
            <p className="text-zinc-600">5-7 dias</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Card className="p-3 w-13">
            <CardHeader className="p-0 flex justify-center">
              <Clock size={28} className="stroke-gray-500"/>
            </CardHeader>
          </Card>
          <div>
            <p className="font-bold">Período de irrigação</p>
            <p className="text-zinc-600">Manhã - Tarde</p>
          </div>
        </div>
      </section>
    </main>
  )
};

export default Details;
