import FormularioPerfil from "@/src/components/formulario-perfil";
import Logo from "../../../components/logo";

interface PageProps {
  params: {
    user: string
  }
}

export default async function CriarPerfil({ params }: PageProps) {

  const {user} = await params;

  return (
    <section className="p-5">
      <div className="flex justify-center mb-5">
        <Logo width={240} height={240} />
      </div>
      <div className="w-full h-[calc(80%-75px)] flex items-center">
        <FormularioPerfil user={user}/>
      </div>
    </section>
  );
}
