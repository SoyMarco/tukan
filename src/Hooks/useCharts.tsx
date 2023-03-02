import { useState, useEffect } from "react";
import { ChartType } from "Types/Dashboard";

function useCharts() {
	const [dataCharts, setDataCharts] = useState<ChartType[]>([]);

	useEffect(() => {
		console.log("dataCharts@@@@@", dataCharts);
	}, [dataCharts]);

	const addChart = (chart: ChartType) => {
		setDataCharts([...dataCharts, chart]);
	};

	const removeChart = (id: number) => {
		const newDataCharts = dataCharts.filter(
			(dataChart) => dataChart.settings.id !== id
		);
		setDataCharts(newDataCharts);
	};

	const editChart = (chart: ChartType) => {
		const newDataCharts = dataCharts.map((dataChart) => {
			if (dataChart.settings.id === chart.settings.id) {
				return chart;
			}
			return dataChart;
		});
		setDataCharts(newDataCharts);
	};
	return { dataCharts, addChart, removeChart, editChart };
}

export default useCharts;
