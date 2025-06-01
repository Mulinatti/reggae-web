import { z } from "zod";

const envSchema = z.object({
    MQTT_USERNAME: z.string(),
    MQTT_PASSWORD: z.string(),
    MQTT_URL: z.string()
});

export const env = envSchema.parse(process.env);