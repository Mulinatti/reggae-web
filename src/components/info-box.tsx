import { Card, CardHeader } from "@/src/components/ui/card";
import { Flower } from "lucide-react";

interface InfoBoxProps {
	title: string;
	subtitle: string;
	children: React.ReactNode;
}

const InfoBox = ({ title, subtitle, children }: InfoBoxProps) => {
	return (
		<div className="flex gap-2">
			<Card className="p-3 w-13">
				<CardHeader className="p-0 flex justify-center">
					{children}
				</CardHeader>
			</Card>
			<div>
				<p className="font-bold">{title}</p>
				<p className="text-zinc-600">{subtitle}</p>
			</div>
		</div>
	)
}

export default InfoBox;