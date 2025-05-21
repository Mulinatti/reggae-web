import { cn } from "@/lib/utils"
import React from "react"

type GaugeType = "humidity" | "temperature"

interface GaugeProps {
	maxGaugeValue: number;
	gaugeValue: number;
	gaugeType?: GaugeType;
}


const gauge = {
	humidity: {
		style: "humidity",
		indicator: "%"
	},
	temperature: {
		style: "temperature",
		indicator: "°"
	}
} as const;

const Gauge = ({maxGaugeValue, gaugeValue, gaugeType = "temperature"}: GaugeProps) => {
	
	const gaugeRotation = (gaugeValue / maxGaugeValue) * 360 - 180;

	return (
		<div className="neumorphism w-28 h-28 flex justify-center items-center relative">
			<div className={cn("w-24 h-24 rounded-full flex justify-center items-center", gauge[gaugeType].style)}>
				<div className="w-20 h-20 bg-background rounded-full flex justify-center items-center">
					<p className="font-bold text-xl ml-1">{gaugeValue}{gauge[gaugeType].indicator}</p>
				</div>
			</div>
			<div style={{ transform: `rotate(${gaugeRotation}deg)` }} className={cn("absolute top-1/2 -translate-y-1/2 h-[calc(100%-8px)]")}>
				<div className="bg-white border border-black/50 w-2 h-4 rounded-full"></div>
			</div>
		</div>
	)
}

export default Gauge;