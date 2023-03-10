import { useContext, useEffect, useMemo, useCallback } from "react";
import { ActionModalEnum, ChartEnum, LanguageEnum } from "Types/Dashboard";
import ContextDashboard from "Context/Dashboard/ContextDashboard";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import useSectorsAdapter from "../../../Adapaters/useSectorsAdapter";
import useDataChartAdapter from "Adapaters/useDataChartAdapter";

function useControllerForm() {
	const { updateSettingsModal, createChart, updateChart, formModal } =
		useContext(ContextDashboard);

	const {
		graficOptions,
		tableOptions,
		chartType,
		language,
		sector,
		action,
		dates,
	} = formModal;

	const {
		dataSectors,
		optionsSectors,
		loading: loadSectors,
	} = useSectorsAdapter(language);

	const {
		dataChart,
		loading: loadChart,
		getDataChart,
		setDataChart,
	} = useDataChartAdapter(formModal);

	useEffect(() => {
		if (!dataChart || isDisabledButton()) return;

		if (action === ActionModalEnum.CREATE) {
			createChart(dataChart);
		}
		if (action === ActionModalEnum.UPDATE) {
			updateChart(dataChart);
		}
		setDataChart(undefined);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataChart]);

	useEffect(() => {
		handleChangeSector(sector);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [optionsSectors]);

	const disabledEndDates = (current: Dayjs) => {
		return current && current >= dayjs().endOf("day");
	};

	const changeTitleModal = (value: string) => {
		const updatedData = value.trim();
		updateSettingsModal({ titleModal: updatedData });
	};

	const setDatePicker = (_dates: any, dateStrings: string[]) => {
		const updatedData = {
			startDate: dateStrings[0],
			endDate: dateStrings[1],
		};
		updateSettingsModal({ dates: updatedData });
	};

	const isDisabledButton = (): boolean => {
		if (!sector || !dates.startDate || !dates.endDate) {
			return true;
		}
		// Table
		if (
			chartType === ChartEnum.TABLE &&
			(!tableOptions?.dateFormat || !tableOptions?.decimals)
		) {
			return true;
		}
		// Grafic
		if (
			chartType === ChartEnum.GRAFIC &&
			(!graficOptions?.color || !graficOptions?.type)
		) {
			return true;
		}

		// Enable button
		return false;
	};

	const handleSubmit = async () => {
		if (isDisabledButton()) return;
		getDataChart();
	};
	const handleChangeSector = (value: string) => {
		const currentSector = optionsSectors.find(
			(sector) => sector.value === value
		);
		if (!currentSector) return;
		updateSettingsModal({
			nameSector: currentSector.label,
			sector: value,
		});
	};
	const datesModal = useMemo(
		() => [
			dayjs(dates.startDate, tableOptions?.dateFormat ?? "YYYY-MM-DD"),
			dayjs(dates.endDate, tableOptions?.dateFormat ?? "YYYY-MM-DD"),
		],

		[dates, tableOptions]
	);
	const [startDate, endDate] = datesModal;

	const changeLanguage = useCallback(
		(value: string) => {
			const newLanguage: LanguageEnum =
				value === "Español" ? LanguageEnum.ESPAÑOL : LanguageEnum.ENGLISH;
			const currentSector = optionsSectors.find(
				(optionSector) => optionSector.value === sector
			);

			if (!currentSector || !value || !dataSectors) return;

			updateSettingsModal({
				nameSector: currentSector.label,
				sector: currentSector.value,
				language: newLanguage,
			});
		},
		[dataSectors, optionsSectors, sector, updateSettingsModal]
	);
	return {
		handleChangeSector,
		disabledEndDates,
		isDisabledButton,
		changeTitleModal,
		changeLanguage,
		setDatePicker,
		handleSubmit,
		optionsSectors,
		loadSectors,
		loadChart,
		startDate,
		endDate,
	};
}

export default useControllerForm;
