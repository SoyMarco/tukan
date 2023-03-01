import { useState } from "react";
import { ChartEnum, DashboardType } from "Types/Dashboard";
import { initialDataDashboard } from "Utils";
import { LanguageType } from "../Types/Dashboard";

function useDashboard() {
	const [dataDashboard, setDataDashboard] =
		useState<DashboardType>(initialDataDashboard);

	const setLanguageType = (value: LanguageType) => {
		const updatedData = { ...dataDashboard, language: value };
		setDataDashboard(updatedData);
	};
	const setChartType = (value: ChartEnum) => {
		const updatedData = { ...dataDashboard, chartType: value };
		setDataDashboard(updatedData);
	};
	const resetDataDashboard = () => {
		setDataDashboard(initialDataDashboard);
	};

	return {
		dataDashboard,
		setChartType,
		resetDataDashboard,
		setLanguageType,
	};
}

export default useDashboard;
