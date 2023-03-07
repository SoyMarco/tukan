import { Line, Column, Area } from "@ant-design/charts";
import { ChartType, GraficEnum } from "Types/Dashboard";

function ChartGrafics({ data, settings }: ChartType) {
	const config = {
		data: data,
		height: 300,
		xField: "fecha",
		yField: "datoN",
		color: settings.graficOptions?.color,
		slider: { start: 0.1, end: 0.99 },
	};
	return (
		<>
			{settings.graficOptions?.type === GraficEnum.LINE && <Line {...config} />}
			{settings.graficOptions?.type === GraficEnum.AREA && <Area {...config} />}
			{settings.graficOptions?.type === GraficEnum.COLUMN && (
				<Column {...config} />
			)}
		</>
	);
}

export default ChartGrafics;
