import { useState, useEffect, useCallback } from "react";
import { ActionModalEnum, ChartType, UseDashboardType } from "Types/Dashboard";
import useChartEditor from "Hooks/useChartEditor";

function useDashboard(): UseDashboardType {
	const [dataDashboards, setdataDashboards] = useState<ChartType[]>([]);

	const {
		settingsModal,
		updateSettingsModal,
		isModalOpen,
		openModal,
		closeModal,
	} = useChartEditor();

	useEffect(() => {
		console.log("dataDashboards@@@@@", dataDashboards);
	}, [dataDashboards]);
	//CREATE
	const createChart = useCallback(
		(chart: ChartType) => {
			setdataDashboards([...dataDashboards, chart]);
			closeModal();
		},
		[closeModal, dataDashboards]
	);
	//READ
	const readChart = (chart: ChartType) => {
		updateSettingsModal({ ...chart.settings, action: ActionModalEnum.UPDATE });
		openModal();
	};
	//UPDATE
	const updateChart = (chart: ChartType) => {
		const newDataCharts = dataDashboards.map((dataChart) => {
			if (dataChart.settings.id === chart.settings.id) {
				return chart;
			}
			return dataChart;
		});
		setdataDashboards(newDataCharts);
		closeModal();
	};
	//DELETE
	const deleteChart = (id: string) => {
		const newDataCharts = dataDashboards.filter(
			(dataChart) => dataChart.settings.id !== id
		);
		setdataDashboards(newDataCharts);
	};
	//CREATE
	const createDashboard = (charts: ChartType[]) => {
		setdataDashboards(charts);
	};
	return {
		dataDashboards,
		createChart,
		readChart,
		updateChart,
		deleteChart,
		settingsModal,
		updateSettingsModal,
		isModalOpen,
		openModal,
		closeModal,
		createDashboard,
	};
}

export default useDashboard;
