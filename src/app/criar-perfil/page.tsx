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

{/*Protótipo total, somente pra existir. */}
export default function CriarPerfil() {

  const form = useForm<z.infer<typeof perfilSchema>>({
    resolver: zodResolver(perfilSchema),
    defaultValues: {
      sun: 0,
      irrigation: 0,
      temp: 0,
      time: 0
    }
  });

  const onSubmit = (values: z.infer<typeof perfilSchema>) => {
    redirect("/");
  }

  return (
    <section className="p-5 flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <Logo width={240} height={240} />
      </div>
      <div className="w-full h-[calc(80%-75px)] flex items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex-1">

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

            <FormField name="temp" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Temperatura Ideal</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="time" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Tempo para Colheita</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
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
