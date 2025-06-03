import mqtt from "mqtt";
import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const PORT = 3001;
const server = http.createServer();
const wss = new WebSocket.Server({ server });

// deviceId => Set of WebSocket clients
const subscriptions = new Map();

const mqttClient = mqtt.connect(
  "wss://6c828d1f191045e1ae9514d4dfbee9a5.s1.eu.hivemq.cloud:8884/mqtt",
  {
    username: "Frontend",
    password: "Frontend123",
  }
);

mqttClient.on("connect", () => {
  console.log("✅ Conectado ao broker MQTT");
});

mqttClient.on("message", (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    const match = topic.match(/^dados_coletados_(.+)$/);
    if (!match) return;

    const deviceId = match[1];
    const clients = subscriptions.get(deviceId);
    if (clients) {
      for (const ws of clients) {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    }
  } catch (err) {
    console.error("Erro ao processar mensagem MQTT:", err);
  }
});

wss.on("connection", (ws) => {
  console.log("🔌 Cliente WebSocket conectado");

  let currentDeviceId = null;

  ws.on("message", (msg) => {
    try {
      const { deviceId } = JSON.parse(msg);
      if (!deviceId) return;

      currentDeviceId = deviceId;

      if (!subscriptions.has(deviceId)) {
        subscriptions.set(deviceId, new Set());

        const topic = `dados_coletados_${deviceId}`;
        mqttClient.subscribe(topic, (err) => {
          if (err) {
            console.error(`Erro ao inscrever no tópico ${topic}:`, err);
          } else {
            console.log(`📡 Inscrito no tópico ${topic}`);
          }
        });
      }

      subscriptions.get(deviceId).add(ws);
    } catch (err) {
      console.error("Erro ao processar mensagem do cliente:", err);
    }
  });

  ws.on("close", () => {
    if (currentDeviceId) {
      const set = subscriptions.get(currentDeviceId);
      if (set) {
        set.delete(ws);
        if (set.size === 0) {
          subscriptions.delete(currentDeviceId);
          mqttClient.unsubscribe(`dados_coletados_${currentDeviceId}`);
          console.log(`❌ Desinscrito de dados_coletados_${currentDeviceId}`);
        }
      }
    }
  });
});