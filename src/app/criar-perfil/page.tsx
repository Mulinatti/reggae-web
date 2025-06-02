"use client"

import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import perfilSchema from "@/src/schemas/perfil-schema"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { redirect } from "next/navigation";
import Logo from "../../components/logo";

{/*Coisas pro calendário*/ }
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { Calendar } from "../../components/ui/calendar";
import { ptBR } from "date-fns/locale";
import mqtt from "mqtt";

import { Plant, PlantCombobox } from "../../components/plantcombobox"
import { useState, useEffect } from "react";


{/*Protótipo total, somente pra existir. */ }
export default function CriarPerfil() {

  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const form = useForm<z.infer<typeof perfilSchema>>({
    resolver: zodResolver(perfilSchema),
    defaultValues: {
      nome: "",
      sun: 0,
      min: 0,
      max: 0,
      time: undefined
    }
  });

  // Atualiza campos com base na planta
  const handleSelectPlant = (plant: any) => {
    const sunValue = Math.floor(Math.random() * (10 - 3 + 1)) + 3; // 3 a 10
    const minValue = Math.floor(Math.random() * (20 - 5 + 1)) + 5; // 5 a 20
    const maxValue = Math.floor(Math.random() * (minValue + 20 - (minValue + 5) + 1)) + (minValue + 5); // min+5 a min+20

    const estimatedHarvest = new Date();
    const daysToAdd = Math.floor(Math.random() * (180 - 60 + 1)) + 60; // entre 60 e 180 dias
    estimatedHarvest.setDate(estimatedHarvest.getDate() + daysToAdd);

    form.setValue("sun", sunValue);
    form.setValue("min", minValue);
    form.setValue("max", maxValue);
    form.setValue("time", estimatedHarvest);
  }

  const onSubmit = (values: z.infer<typeof perfilSchema>) => {
    const client = mqtt.connect("wss://6c828d1f191045e1ae9514d4dfbee9a5.s1.eu.hivemq.cloud:8884/mqtt", {
      username: "Frontend",
      password: "Frontend123",
    });

    const topic = "dados";
    
    client.publish(topic, JSON.stringify(values));

    console.log(JSON.stringify(values));
  }

  return (
    <section className="p-5 flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <Logo width={240} height={240} />
      </div>
      <div className="w-full h-[calc(80%-75px)] flex items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex-1">
          
          <PlantCombobox onSelectPlant={(plant) => {setSelectedPlant(plant); handleSelectPlant(plant);}} />

            <FormField name="sun" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Tempo de Exposição ao Sol</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="min" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Temperatura Minima</FormLabel>
                <FormControl>
                  <Input {...field} type="number"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="max" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Temperatura Máxima</FormLabel>
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
      </div>
    </section>
  );
}
