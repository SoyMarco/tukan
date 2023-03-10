import { Line, Column, Area } from "@ant-design/charts";
import { ChartType, GraficEnum } from "Types/Dashboard";

function ChartGrafics({ data, settings }: ChartType) {
	const { graficOptions } = settings;
	if (!graficOptions) return <></>;

	const { type, color } = graficOptions;

	const config = {
		data: data,
		height: 300,
		xField: "fecha",
		yField: "datoN",
		color: color,
		slider: { start: 0.1, end: 0.99 },
	};

	return (
		<>
			{type === GraficEnum.LINE && <Line {...config} />}
			{type === GraficEnum.AREA && <Area {...config} />}
			{type === GraficEnum.COLUMN && <Column {...config} />}
		</>
	);
}

export default ChartGrafics;
