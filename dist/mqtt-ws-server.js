"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt_1 = require("mqtt");
var ws_1 = require("ws");
var http_1 = require("http");
var PORT = 3001;
var clients = new Set();
var server = http_1.default.createServer();
var wss = new ws_1.WebSocketServer({ server: server });
wss.on("connection", function (ws) {
    console.log("Cliente WebSocket conectado");
    clients.add(ws);
    ws.on("close", function () {
        clients.delete(ws);
        console.log("Cliente WebSocket desconectado");
    });
});
// Conecta ao broker MQTT
var mqttClient = mqtt_1.default.connect("wss://6c828d1f191045e1ae9514d4dfbee9a5.s1.eu.hivemq.cloud:8884/mqtt", {
    username: "Frontend",
    password: "Frontend123",
});
mqttClient.on("connect", function () {
    console.log("Conectado ao broker MQTT");
    mqttClient.subscribe("dados_coletados", function (err) {
        if (!err) {
            console.log("Inscrito no tópico dados_coletados");
        }
    });
});
mqttClient.on("message", function (_topic, message) {
    try {
        var data = JSON.parse(message.toString());
        for (var _i = 0, clients_1 = clients; _i < clients_1.length; _i++) {
            var client = clients_1[_i];
            if (client.readyState === ws_1.default.OPEN) {
                client.send(JSON.stringify(data));
            }
        }
    }
    catch (err) {
        console.error("Erro ao processar mensagem MQTT:", err);
    }
});
server.listen(PORT, function () {
    console.log("Servidor WebSocket escutando em ws://localhost:".concat(PORT));
});
