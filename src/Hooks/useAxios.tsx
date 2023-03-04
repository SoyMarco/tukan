import { useState, useCallback } from "react";
import axios, { AxiosResponse } from "axios";
import { notification } from "antd";
import {
	TOKENOFTUKAN,
	BMX_TOKEN,
	URL_TUKAN,
	customArrayLanguage,
	transformDataChart,
} from "Utils";
import {
	ChartSettingsType,
	ChartType,
	DataSectorsType,
	DecimalsEnum,
	LanguageEnum,
	OptionsSelectType,
} from "Types/Dashboard";

function useAxios() {
	const [dataSectors, setDataSectors] = useState<DataSectorsType[]>();

	const [optionsSectors, setOptionsSectors] = useState<OptionsSelectType[]>([]);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = useCallback(
		async (
			URL: string,
			sinCeros?: DecimalsEnum
		): Promise<AxiosResponse | undefined> => {
			if (loading) return;
			const headers = {
				Accept: "*/*",
				Authorization: TOKENOFTUKAN,
			};
			const params = {
				token: BMX_TOKEN,
				decimales: sinCeros === DecimalsEnum.sinCeros ? "sinCeros" : null,
			};
			try {
				setLoading(true);
				return await axios.get(URL, { headers, params });
			} catch (error: any) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[loading]
	);

	const updateChartData = useCallback(
		async (
			settingsModal: ChartSettingsType
		): Promise<ChartType | undefined> => {
			const { dates, sector, tableOptions } = settingsModal;
			const sinCeros = tableOptions?.decimals;
			const URL_CUSTOM = `${URL_TUKAN}${sector}/${dates?.startDate}/${dates?.endDate}`;
			const response = await fetchData(URL_CUSTOM, sinCeros);
			try {
				if (response?.data?.bmx) {
					const transformedData = transformDataChart(
						response?.data.bmx?.series[0]?.datos,
						tableOptions?.dateFormat
					);

					if (transformedData.length > 0) {
						const updatedCharts = {
							settings: settingsModal,
							data: transformedData,
						};
						return updatedCharts;
					}
				}
			} catch (error) {
				notification["warning"]({
					message: "No se encontraron datos para la fecha seleccionada",
				});
			}
			return undefined;
		},
		[fetchData]
	);

	const updatesSectorsData = useCallback(
		async (language: LanguageEnum): Promise<void> => {
			if (dataSectors) {
				const dataSectores = customArrayLanguage(language, dataSectors);
				setOptionsSectors(dataSectores);
				return;
			}

			const response = await fetchData(URL_TUKAN);
			if (response?.data?.data) {
				const sectores = response.data.data;
				const dataSectores = customArrayLanguage(language, sectores);
				setDataSectors(sectores);
				setOptionsSectors(dataSectores);
			}
		},
		[dataSectors, fetchData]
	);

	return {
		optionsSectors,
		loading,
		error,
		updatesSectorsData,
		updateChartData,
	};
}

export default useAxios;
