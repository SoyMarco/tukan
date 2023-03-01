import { useState } from "react";
import type {
	ChartEnum,
	DashboardType,
	DateFormatEnum,
	LanguageType,
} from "Types/Dashboard";
import { initialDataDashboard } from "Utils";
import type { Dayjs } from "dayjs";

function useDashboard() {
	const [dataDashboard, setDataDashboard] =
		useState<DashboardType>(initialDataDashboard);

	const resetDataDashboard = () => {
		setDataDashboard(initialDataDashboard);
	};
	const setLanguageType = (value: LanguageType) => {
		const updatedData = { ...dataDashboard, language: value };
		setDataDashboard(updatedData);
	};
	const setChartType = (value: ChartEnum) => {
		const updatedData = { ...dataDashboard, chartType: value };
		setDataDashboard(updatedData);
	};
	const setSector = (value: string) => {
		const updatedData = { ...dataDashboard, sector: value };
		setDataDashboard(updatedData);
	};
	const setDateFormat = (value: DateFormatEnum) => {
		const updatedData = {
			...dataDashboard,
			tableOptions: {
				decimals: dataDashboard?.tableOptions?.decimals,
				dateFormat: value,
			},
		};
		setDataDashboard(updatedData);
	};

	const setColorPicker = (value: string) => {
		const updatedData = {
			...dataDashboard,
			graficOptions: { color: value, type: dataDashboard?.graficOptions?.type },
		};
		setDataDashboard(updatedData);
	};

	const setDatePicker = (
		dates: null | (Dayjs | null)[],
		dateStrings: string[]
	) => {
		if (dates) {
			console.log("From: ", dates[0], ", to: ", dates[1]);
			console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
			const updatedData = {
				...dataDashboard,
				startDate: dateStrings[0],
				endDate: dateStrings[1],
			};
			setDataDashboard(updatedData);
		} else {
			console.log("Clear");
		}
	};
	return {
		dataDashboard,
		setChartType,
		resetDataDashboard,
		setLanguageType,
		setSector,
		setDateFormat,
		setColorPicker,
		setDatePicker,
	};
}

export default useDashboard;
