import Logo from "@/src/components/logo";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Droplet, Leaf } from "lucide-react";

const Home = () => {
	return (
		<main className="p-5 space-y-2">
			<Logo width={100} height={100} />
			<ul>
				<li>
					<Card className="w-full relative overflow-clip p-2 cursor-pointer flex flex-row">
						<CardHeader className="relative">
							<div className="absolute opacity-40 top-1/2 -translate-y-1/2 -left-1/2 p-3 border-[4px] rounded-full border-primary ">
								<Leaf className="stroke-lime-700" size={72} />
							</div>
						</CardHeader>
						<div className="ml-8 space-y-2">
							<CardContent className="p-0">
								<CardTitle>Samambaia</CardTitle>
								<CardDescription className="text-xs text-black/50">3102302</CardDescription>
							</CardContent>
							<CardFooter className="p-0">
								<Droplet className="fill-cyan-600/50 relative -left-0.5 stroke-black/40" size={16} />
								<p className="text-sm text-lime-800/80">2h atrás</p>
							</CardFooter>
						</div>
					</Card>
				</li>
			</ul>
		</main>
	)
}

export default Home;