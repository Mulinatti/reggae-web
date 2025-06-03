interface IPlant {
  name: string;
  min: number;         // Temperatura mínima recomendada (°C)
  max: number;         // Temperatura máxima recomendada (°C)
  sun: number;         // Horas de exposição ao sol por dia
  irrigation: number;
  harvest: boolean;  // Irrigações por dia (pode ser decimal para 1 vez a cada 2 dias, etc.)
}

export default IPlant;