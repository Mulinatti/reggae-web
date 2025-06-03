"use client"

import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import cadastroSchema from "@/src/schemas/cadastro-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { redirect } from "next/navigation";
import Logo from "../../components/logo";

export default function Cadastro() {

  const form = useForm<z.infer<typeof cadastroSchema>>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      username: "",
      deviceId: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = (values: z.infer<typeof cadastroSchema>) => {
    const storedUsers = localStorage.getItem("users");
    const { username, password, deviceId } = values;

    if (storedUsers) {
      localStorage.setItem("users", JSON.stringify([...JSON.parse(storedUsers), {username, password, deviceId}]))
      return redirect(`/home/${username}`)
    }
    localStorage.setItem("users", JSON.stringify([{username, password, deviceId}]));
    return redirect(`/home/${username}`)
  }

  return (
    <section className="p-5 flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <Logo width={240} height={240} />
      </div>
      <div className="w-full h-[calc(80%-75px)] flex items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex-1">
            <FormField name="username" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="deviceId" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Id de dispositivo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="password" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Nada feito ainda. Conferir posteriormente sobre como fazer isso. */}
            <FormField name="confirmPassword" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <Button size="lg" className="w-full mt-1.5 font-semibold" type="submit">Cadastro</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
