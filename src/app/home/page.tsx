"use client"

import Logo from "@/src/components/logo";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { env } from "@/src/env";
import { Droplet, Leaf, LogOut, Settings } from "lucide-react";
import mqtt, { MqttClient } from "mqtt"
import { useEffect } from "react";

const Home = () => {



	useEffect(() => {

		const client = mqtt.connect(env.MQTT_URL, {
			username: env.MQTT_USERNAME,
			password: env.MQTT_PASSWORD,
		});

		client.on("connect", () => {
			const topical = "temperatura_e_umidade_do_solo";

			client.subscribe(topical, (err) => {
				if (!err) {
					console.log(`Inscrito no tópico ${topical}`);
					client.end();
				} else {
					console.error('Erro ao se inscrever:', err);
					client.end();
				}
			});
		});


		client.on("message", (topic: string, message: Buffer) => {
			console.log(message.toString());
			client.end();
		});

		return () => {
			client.end();
		}
	}, []);

	return (
		<main className="p-5 flex flex-col h-dvh gap-2">
			<Logo width={100} height={100} />
			<ul className="flex-1">
				<li>
					<Card className="w-full hover:scale-[101%] transition-transform relative overflow-clip p-2 cursor-pointer flex flex-row">
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