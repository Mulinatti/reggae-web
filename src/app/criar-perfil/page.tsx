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

{/*Coisas pro calendário*/}
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { Calendar } from "../../components/ui/calendar";
import { ptBR } from "date-fns/locale";

{/*Protótipo total, somente pra existir. */}
export default function CriarPerfil() {

  const form = useForm<z.infer<typeof perfilSchema>>({
    resolver: zodResolver(perfilSchema),
    defaultValues: {
      sun: 0,
      irrigation: 0,
      temp: 0,
      time: undefined
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
                <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-[240px] pl-3 text-left font-normal
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
                        toYear={new Date().getFullYear()}
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
