import { useState } from "react";
import type { ChartSettingsType } from "Types/Dashboard";
import { initialDataDashboard } from "Utils";

function useChartSettings() {
	const [chartSettings, setDataDashboard] =
		useState<ChartSettingsType>(initialDataDashboard);

	const resetChartSettings = () => {
		setDataDashboard(initialDataDashboard);
	};

	const updateChartSettings = <T extends keyof ChartSettingsType>(
		prop: T,
		value: ChartSettingsType[T]
	) => {
		const id = new Date().getTime();

		const updatedData = { ...chartSettings, id, [prop]: value };
		setDataDashboard(updatedData);
	};

	return {
		chartSettings,
		resetChartSettings,
		updateChartSettings,
	};
}

export default useChartSettings;
