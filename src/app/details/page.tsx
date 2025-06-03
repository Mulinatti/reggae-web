"use client"

import Gauge from "@/src/components/gauge";
import InfoBox from "@/src/components/info-box";
import { env } from "@/env";
import { Clock, Droplet, Flower, Info, Sprout, Sun, TriangleAlert } from "lucide-react";
import mqtt from "mqtt"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import IDetails from "../interfaces/IDetails";
import axios from "axios";

const Details = () => {

  const [details, setDetails] = useState<IDetails>();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001"); // ajuste se for produção

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setDetails(data);
      } catch (error) {
        console.error("Erro ao processar dados:", error);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  console.log(details);

  return (
    <main className="p-5">
      <div className="bg-primary/10 rounded-full w-[300px] h-[300px] mx-auto flex justify-center items-center">
        <Image className="pb-5" width={170} height={170} src="/samambaia.png" alt="Samambaia" />
      </div>
      <div className="text-center">
        <h1 className="mt-5 font-bold text-2xl text-primary">Samambaia</h1>
        <p className="text-xs text-zinc-500">{details?.deviceId}</p>
      </div>
      <section className="flex gap-10 justify-center mt-8">
        <div>
          <Gauge gaugeValue={details?.temperature!} maxGaugeValue={45} gaugeType="temperature" />
          <p className="text-center mt-2 text-zinc-700">Temperatura</p>
        </div>
        <div>
          <Gauge gaugeValue={details?.humidity!} maxGaugeValue={100} gaugeType="humidity" />
          <p className="text-center mt-2 text-zinc-700">Umidade</p>
        </div>
      </section>

      <section className="mt-2 p-8 space-y-3">
        <div className="flex gap-2 justify-center">
          <Info size={20} className="stroke-primary" />
          <p className="text-zinc-700">Última irrigação 2h atrás</p>
        </div>
        <div hidden={!details?.max_temp_exceeded} className="flex gap-2 justify-center animate-pulse">
          <TriangleAlert size={20} className="stroke-amber-400"/>
          <p className="text-amber-500">Temperatura muito alta</p>
        </div>
        <div hidden={!details?.is_reservatory_empty} className="flex gap-2 justify-center animate-pulse">
          <TriangleAlert size={20} className="stroke-red-400"/>
          <p className="text-red-500">Sem água no reservatório</p>
        </div>
      </section>

      <hr></hr>

      <section className="space-y-4 p-8">
        <h2 className="text-center font-bold text-xl text-primary">Informações</h2>
        <InfoBox title="Flora" subtitle="Primavera">
          <Flower className="stroke-rose-300" />
        </InfoBox>
        <InfoBox title="Colheita" subtitle="Inverno">
          <Sprout className="stroke-emerald-600" />
        </InfoBox>
        <InfoBox title="Período de sol" subtitle="4h">
          <Sun className="stroke-yellow-500" />
        </InfoBox>
        <InfoBox title="Irrigação" subtitle="5-7 dias">
          <Droplet className="stroke-blue-500 fill-blue-300" />
        </InfoBox>
        <InfoBox title="Período de irrigação" subtitle="Manhã - Tarde">
          <Clock className="stroke-zinc-500" />
        </InfoBox>
      </section>
    </main>
  )
};

export default Details;
