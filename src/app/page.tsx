"use client"

import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import loginSchema from "@/src/schemas/login-schema"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../components/ui/input";
import { redirect } from "next/navigation";
import Logo from "../components/logo";
import FormularioLogin from "../components/formulario-login";
import Link from "next/link";

export default function Login() {

  return (
    <section className="p-5 flex flex-col justify-center h-dvh">
      <div className="flex justify-center">
        <Logo width={240} height={240} />
      </div>
      <div className="w-full h-fit flex items-center">
        <FormularioLogin />
      </div>
      <Link className="text-center h-[20px] mt-8 hover:" href="/cadastro">
        <Button variant="ghost">
          Página de cadastro
        </Button>
      </Link>
    </section>
  );
}
