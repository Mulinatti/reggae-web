"use client"

import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import perfilSchema from '../schemas/perfil-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import mqtt from 'mqtt';
import { z } from 'zod';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { ptBR } from 'date-fns/locale';

import { Plant, PlantCombobox } from "../components/plantcombobox"

interface IUser {
  deviceId: string,
  username: string,
  password: string
}

interface FormularioProps {
    user: string;
}

const FormularioPerfil = ({user}: FormularioProps) => {

    const [deviceId, setDeviceId] = useState<string>();

    const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

    const form = useForm<z.infer<typeof perfilSchema>>({
        resolver: zodResolver(perfilSchema),
        defaultValues: {
            name: "",
            deviceId: "",
            min: 0,
            max: 0,
            sun: 0,
            irrigation: 0,
            time: new Date()
        }
    });

    // Atualiza campos com base na planta
  const handleSelectPlant = (plant: any) => {
    const sunValue = Math.floor(Math.random() * (10 - 3 + 1)) + 3; // 3 a 10
    const minValue = Math.floor(Math.random() * (20 - 5 + 1)) + 5; // 5 a 20
    const maxValue = Math.floor(Math.random() * (minValue + 20 - (minValue + 5) + 1)) + (minValue + 5); // min+5 a min+20
    const irriValue = Math.floor(Math.random() * (6 - 0 + 1)); // 0 a 6 

    const estimatedHarvest = new Date();
    const daysToAdd = Math.floor(Math.random() * (180 - 60 + 1)) + 60; // entre 60 e 180 dias
    estimatedHarvest.setDate(estimatedHarvest.getDate() + daysToAdd);

    form.setValue("name", plant.common_name);
    form.setValue("sun", sunValue);
    form.setValue("min", minValue);
    form.setValue("max", maxValue);
    form.setValue("time", estimatedHarvest);
    form.setValue("irrigation", irriValue);
  }

    useEffect(() => {
        const data = localStorage.getItem("users");
        const id = user;
        if (data) {
            const users: IUser[] = JSON.parse(data);
            const user = users.find((user) => user.username === id);
            setDeviceId(user?.deviceId);
        }
    }, [])

    const onSubmit = (values: z.infer<typeof perfilSchema>) => {
        const client = mqtt.connect("wss://6c828d1f191045e1ae9514d4dfbee9a5.s1.eu.hivemq.cloud:8884/mqtt", {
            username: "Frontend",
            password: "Frontend123",
        });

        values.deviceId = deviceId!
        console.log(values.deviceId);

        const topic = "dados";

        console.log(JSON.stringify(values));
        client.publish(topic, JSON.stringify(values));

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex-1">

                <PlantCombobox onSelectPlant={(plant) => {setSelectedPlant(plant); handleSelectPlant(plant);}} />

                <FormField name="name" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome da planta</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField name="sun" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tempo de Sol</FormLabel>
                        <FormControl>
                            <Input {...field} type="number"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField name="irrigation" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Frequência de Irrigação</FormLabel>
                        <FormControl>
                            <Input {...field} type="number"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField name="max" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Temperatura máxima</FormLabel>
                        <FormControl>
                            <Input {...field} type="number"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField name="min" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Temperatura mínima</FormLabel>
                        <FormControl>
                            <Input {...field} type="number"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField name="time" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tempo para Colheita</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={"outline"}
                                        className={`w-full hover:bg-secondary border-primary pl-3 text-left font-normal
                          ${!field.value && "text-muted-foreground"}`}
                                    >
                                        {field.value ? (
                                            format(field.value, "dd/MM/yyyy")
                                        ) : (
                                            <span>Escolha uma data para colher</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    locale={ptBR}
                                    captionLayout="dropdown-buttons"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    fromYear={2025}
                                    toYear={new Date().getFullYear() + 64}
                                    disabled={(date) =>
                                        date < new Date()
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )} />

                <Button size="lg" className="w-full mt-1.5 font-semibold" type="submit">Criar</Button>
            </form>
        </Form>
    )
}

export default FormularioPerfil;