"use client"

import React, { useEffect, useState } from 'react'
import IDevice from '../app/interfaces/IDevice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Leaf } from 'lucide-react';
import { redirect } from 'next/navigation';

interface DeviceProps {
    user: string;
}

const Devices = ({ user }: DeviceProps) => {

    const [devices, setDevices] = useState<IDevice[]>();

    useEffect(() => {
        const data = localStorage.getItem("plants");
        if (data) {
            const storedDevices: IDevice[] = JSON.parse(data);
            const userDevices = storedDevices.filter(device => device.user === user);
            console.log(storedDevices);
            setDevices(userDevices);
        }
    }, [])

    const redirecionar = (id: string) => {
        redirect(`/details/${id}`);
    }

    return (
        <ul className="flex-1">
            {devices?.map((device) => (
                <li onClick={() => {
                    redirecionar(device.deviceId)
                }} key={device.deviceId}>
                    <Card className="w-full hover:scale-[101%] h-20 transition-transform relative overflow-clip p-2 cursor-pointer flex flex-row">
                        <CardHeader className="relative">
                            <div className="absolute opacity-40 top-1/2 -translate-y-1/2 -left-1/2 p-3 border-[4px] rounded-full border-primary ">
                                <Leaf className="stroke-lime-700" size={72} />
                            </div>
                        </CardHeader>
                        <div className="ml-8 space-y-2">
                            <CardContent className="p-0">
                                <CardTitle>{device.plantName}</CardTitle>
                                <CardDescription className="text-xs text-black/50">{device.deviceId}</CardDescription>
                            </CardContent>
                        </div>
                    </Card>
                </li>
            ))}
        </ul>
    )
}

export default Devices;