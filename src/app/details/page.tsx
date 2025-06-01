"use client"

import Gauge from "@/src/components/gauge";
import InfoBox from "@/src/components/info-box";
import { env } from "@/src/env";
import { Clock, Droplet, Flower, Info, Sprout, Sun } from "lucide-react";
import mqtt from "mqtt"
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Details = () => {

  const [temperature, setTemperature] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);

  useEffect(() => {

		const client = mqtt.connect("wss://6c828d1f191045e1ae9514d4dfbee9a5.s1.eu.hivemq.cloud:8884/mqtt", {
			username: "Frontend",
			password: "Frontend123",
		});

		client.on("connect", () => {
			const topical = "temperatura_e_umidade_do_solo";

			client.subscribe(topical, (err) => {
				if (!err) {
					console.log(`Inscrito no tópico ${topical}`);
				} else {
					console.error('Erro ao se inscrever:', err);
				}
			});
		});


		client.on("message", (topic: string, message: Buffer) => {
			const { temperature, humidity } = JSON.parse(message.toString());
      setTemperature(temperature);
      setHumidity(humidity);
		});

    return () => {
      client.end();
    }

	}, []);
  

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
          <Gauge gaugeValue={temperature} maxGaugeValue={45} gaugeType="temperature"/>
          <p className="text-center mt-2 text-zinc-700">Temperatura</p>
        </div>
        <div>
          <Gauge gaugeValue={humidity} maxGaugeValue={100} gaugeType="humidity"/>
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
        <InfoBox title="Flora" subtitle="Primavera">
          <Flower className="stroke-rose-300"/>
        </InfoBox>
        <InfoBox title="Colheita" subtitle="Inverno">
          <Sprout className="stroke-emerald-600"/>
        </InfoBox>
        <InfoBox title="Período de sol" subtitle="4h">
          <Sun className="stroke-yellow-500"/>
        </InfoBox>
        <InfoBox title="Irrigação" subtitle="5-7 dias">
          <Droplet className="stroke-blue-500 fill-blue-300"/>
        </InfoBox>
        <InfoBox title="Período de irrigação" subtitle="Manhã - Tarde">
          <Clock className="stroke-zinc-500"/>
        </InfoBox>
      </section>
    </main>
  )
};

export default Details;
