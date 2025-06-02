import mqtt from "mqtt";
import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const PORT = 3001;
const clients = new Set();

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Cliente WebSocket conectado");
  clients.add(ws);

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Cliente WebSocket desconectado");
  });
});

// Conecta ao broker MQTT
const mqttClient = mqtt.connect(
  process.env.MQTT_URL,
  {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
  }
);

mqttClient.on("connect", () => {
  console.log("Conectado ao broker MQTT");
  mqttClient.subscribe("dados_coletados", (err) => {
    if (!err) {
      console.log("Inscrito no tópico dados_coletados");
    }
  });
});

mqttClient.on("message", (_topic, message) => {
  try {
    const data = JSON.parse(message.toString());

    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    }
  } catch (err) {
    console.error("Erro ao processar mensagem MQTT:", err);
  }
});

server.listen(PORT, () => {
  console.log(`Servidor WebSocket escutando em ws://localhost:${PORT}`);
});