import mqtt from "mqtt";

export const GET = async () => {

	const data = {
		temperature: 0,
		humidity: 0
	}

  const client = mqtt.connect(
    "wss://6c828d1f191045e1ae9514d4dfbee9a5.s1.eu.hivemq.cloud:8884/mqtt",
    {
      username: "Frontend",
      password: "Frontend123",
    }
  );

  client.on("connect", () => {
    const topical = "dados_coletados";

    client.subscribe(topical, (err) => {
      if (!err) {
        console.log(`Inscrito no tópico ${topical}`);
      } else {
        console.error("Erro ao se inscrever:", err);
      }
    });
  });

  client.on("message", (topic: string, message: Buffer) => {
    const { temperature, humidity } = JSON.parse(message.toString());
		data.temperature = temperature
		data.humidity = humidity
  });


  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
