interface IDetails {
    deviceId: string;
    temperature: number;
    humidity: number;
    min_since_watered: 0,
    sun_expo_ended: boolean;
    max_temp_exceeded: boolean;
    min_temp_exceeded: boolean;
    is_reservatory_empty: boolean,
}

export default IDetails;