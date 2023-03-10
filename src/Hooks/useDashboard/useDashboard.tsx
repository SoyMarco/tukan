import { useState, useCallback } from "react";
import useFormModal from "Hooks/useFormModal/useFormModal";
import { initialDataFormModal } from "Utils";
import {
	ActionModalEnum,
	ChartSettingsType,
	ChartType,
	UseDashboardType,
} from "Types/Dashboard";

function useDashboard(): UseDashboardType<ChartSettingsType> {
	const [dataDashboards, setdataDashboards] = useState<ChartType[]>([]);

	const { formModal, updateSettingsModal, isModalOpen, openModal, closeModal } =
		useFormModal<ChartSettingsType>(initialDataFormModal);

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

	//CREATE DASHBOARD
	const createDashboard = (charts: ChartType[]) => {
		setdataDashboards(charts);
	};

	return {
		updateSettingsModal,
		createDashboard,
		createChart,
		updateChart,
		deleteChart,
		closeModal,
		readChart,
		openModal,
		dataDashboards,
		isModalOpen,
		formModal,
	};
}

export default useDashboard;
