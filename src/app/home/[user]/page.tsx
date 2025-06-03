import Logo from "@/src/components/logo";
import { Button } from "@/src/components/ui/button";
import { LogOut, PlusCircle, Settings } from "lucide-react";
import Devices from "@/src/components/devices";
import { redirect } from "next/navigation";
import Link from "next/link";

interface PageProps {
	params: {
		user: string
	}
}

const Home = async ({ params }: PageProps) => {

	const { user } = await params;

	return (
		<main className="p-5 flex flex-col h-dvh gap-2">
			<Logo width={100} height={100} />
			<Devices user={user} />
			<section className="flex justify-evenly">
				<Link href="/">
					<Button variant="ghost">
						<LogOut className="size-8 stroke-zinc-500" />
					</Button>
				</Link>
				<Link href={`/criar-perfil/${user}`}>
					<Button variant="ghost">
						<PlusCircle className="size-8 stroke-zinc-500" />
					</Button>
				</Link>
			</section>
		</main>
	)
}

export default Home;