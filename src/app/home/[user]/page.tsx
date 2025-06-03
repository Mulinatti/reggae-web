"use client"

import Logo from "@/src/components/logo";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Leaf, LogOut, Settings } from "lucide-react";

const Home = () => {
	
	return (
		<main className="p-5 flex flex-col h-dvh gap-2">
			<Logo width={100} height={100} />
			<ul className="flex-1">
				<li>
					<Card className="w-full hover:scale-[101%] h-20 transition-transform relative overflow-clip p-2 cursor-pointer flex flex-row">
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
						</div>
					</Card>
				</li>
			</ul>
			<section className="flex justify-evenly">
				<Button variant="ghost">
					<LogOut className="size-8 stroke-zinc-500" />
				</Button>
				<Button variant="ghost">
					<Settings className="size-8 stroke-zinc-500" />
				</Button>
			</section>
		</main>
	)
}

export default Home;