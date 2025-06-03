"use client"

import { Info, TriangleAlert } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import IDetails from '../app/interfaces/IDetails';
import Gauge from './gauge';
import mqtt from 'mqtt';
import IDevice from '../app/interfaces/IDevice';

interface DetailsProps {
    deviceId: string;
}

const Detalhes = ({ deviceId }: DetailsProps) => {

    const topic = `dados_coletados_${deviceId}`;
    const [plantName, setPlantName] = useState<string>();


    const [details, setDetails] = useState<IDetails>();

    useEffect(() => {

        const data = localStorage.getItem("plants");
        if (data) {
            const plants: IDevice[] = JSON.parse(data);
            const plant = plants.find(plant => plant.deviceId === deviceId);
            setPlantName(plant?.plantName);
        }

        const client = mqtt.connect(
            "wss://6c828d1f191045e1ae9514d4dfbee9a5.s1.eu.hivemq.cloud:8884/mqtt",
            {
                username: "Frontend",
                password: "Frontend123",
            }
        );

        client.on('connect', () => {
            client.subscribe(topic, (err) => {
                if (!err) {
                    console.log(`Inscrito no tópico ${topic}`);
                } else {
                    console.error('Erro ao se inscrever:', err);
                }
            });
        });

        client.on('message', (_topic: string, payload: Buffer) => {
            const msg = JSON.parse(payload.toString());
            setDetails(msg);
            console.log('Mensagem recebida:', msg);
        });

        client.on('error', (err) => {
            console.error('Erro MQTT:', err);
        });

        client.on('close', () => {
        });

        return () => {
            client.end();
        };
    }, []);

    console.log(details);

    const wateredTime = (time: number) => {
        if(time <= 60)
            return `Última irrigação ${time} ${time != 1 ? "minutos" : "minuto"} atrás`;
        else {
            const horas = parseInt((time / 60).toFixed(0));
            return `Última irrigação ${horas} ${horas != 1 ? "horas" : "hora"} atrás`;
        }
    }

    return (
        <div>
            <div className="bg-primary/10 rounded-full w-[300px] h-[300px] mx-auto flex justify-center items-center">
                <Image className="pb-5" width={170} height={170} src="/samambaia.png" alt="Samambaia" />
            </div>
            <div className="text-center">
                <h1 className="mt-5 font-bold text-2xl text-primary">{plantName}</h1>
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
                    <p className="text-zinc-700">{wateredTime(details?.min_since_watered!)}</p>
                </div>
                <div hidden={!details?.sun_expo_ended} className="flex gap-2 justify-center animate-pulse">
                    <Info size={20} className="stroke-blue-500" />
                    <p className="text-blue-500">Fim da exposição ao sol</p>
                </div>
                <div hidden={!details?.max_temp_exceeded} className="flex gap-2 justify-center animate-pulse">
                    <TriangleAlert size={20} className="stroke-amber-400" />
                    <p className="text-amber-500">Temperatura muito alta</p>
                </div>
                <div hidden={!details?.min_temp_exceeded} className="flex gap-2 justify-center animate-pulse">
                    <TriangleAlert size={20} className="stroke-amber-400" />
                    <p className="text-amber-500">Temperatura muito baixa</p>
                </div>
                <div hidden={!details?.is_reservatory_empty} className="flex gap-2 justify-center animate-pulse">
                    <TriangleAlert size={20} className="stroke-red-400" />
                    <p className="text-red-500">Sem água no reservatório</p>
                </div>
            </section>
        </div>
    )
}

export default Detalhes;