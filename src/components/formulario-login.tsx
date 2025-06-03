"use client"

import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { z } from "zod"
import loginSchema from "../schemas/login-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { redirect } from "next/navigation"
import IUser from "../app/interfaces/IUser"
import { useState } from "react"

const FormularioLogin = () => {

    const [warning, setWarning] = useState<boolean>(false);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        const data = localStorage.getItem("users");
        if (data) {
            const storedUsers: IUser[] = JSON.parse(data);
            const user = storedUsers.find(user => user.username === values.username && user.password === user.password
            )
            if(user) {
                setWarning(false);
                return redirect(`/home/${user.username}`)
            }
        }
        return setWarning(true);
    }

    return (
        <main className="w-full">
            <div className="text-red-500 text-center mb-4">
                <p hidden={!warning}>Credenciais incorretas</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex-1">
                    <FormField name="username" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField name="password" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button size="lg" className="w-full mt-1.5 font-semibold" type="submit">Login</Button>
                </form>
            </Form>
        </main>
    )
}

export default FormularioLogin