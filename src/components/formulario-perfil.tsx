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
import { redirect } from 'next/navigation';
import IUser from '../app/interfaces/IUser';

interface FormularioProps {
    user: string;
}

const FormularioPerfil = ({ user }: FormularioProps) => {

    const [deviceId, setDeviceId] = useState<string>();

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

        console.log(values.deviceId);

        const topic = "dados";

        const formattedValues = {
            ...values,
            time: format(values.time, 'dd/MM/yyyy'),
            deviceId: deviceId
        };

        console.log(JSON.stringify(formattedValues));
        //client.publish(topic, JSON.stringify(values));

        const storedPerfils = localStorage.getItem("plants");

        const createdPerfil = {
            user,
            plantName: values.name,
            deviceId
        }

        if (storedPerfils) {
            localStorage.setItem("plants", JSON.stringify([createdPerfil]))
            return redirect(`/home/${user}`)
        }
        localStorage.setItem("plants", JSON.stringify([createdPerfil]));
        return redirect(`/home/${user}`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex-1">

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
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField name="irrigation" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Frequência de Irrigação</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField name="max" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Temperatura máxima</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField name="min" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Temperatura mínima</FormLabel>
                        <FormControl>
                            <Input {...field} />
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