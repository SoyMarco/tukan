import { useState, useCallback } from "react";
import { getDataBanxico, getSeriesCatalog } from "Service/services";
import { customArrayLanguage, transformDataChart } from "Utils";
import { AxiosResponse } from "axios";
import { notification } from "antd";
import {
	ChartSettingsType,
	ChartType,
	DataSectorsType,
	LanguageEnum,
	OptionsSelectType,
} from "Types/Dashboard";

function useAxios() {
	const [dataSectors, setDataSectors] = useState<DataSectorsType[]>();
	const [optionsSectors, setOptionsSectors] = useState<OptionsSelectType[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const requestData = useCallback(
		async (
			request: (params: any) => Promise<AxiosResponse | undefined>,
			params?: any
		): Promise<AxiosResponse | undefined> => {
			if (loading) return;
			try {
				setLoading(true);
				return await request(params);
			} catch (error: any) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[loading]
	);

	const adatperDataChart = useCallback(
		async (
			settingsModal: ChartSettingsType
		): Promise<ChartType | undefined> => {
			const { tableOptions } = settingsModal;
			const response = await requestData(getDataBanxico, settingsModal);
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
							id: settingsModal.id,
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
		[requestData]
	);

	const adatperDataSectors = useCallback(
		async (language: LanguageEnum) => {
			// esta en pruebas
			// if (dataSectors) {
			// 	const dataSectores = customArrayLanguage(language, dataSectors);
			// 	setOptionsSectors(dataSectores);
			// 	return;
			// }

			const response = await requestData(getSeriesCatalog);
			if (response?.data?.data) {
				const sectores = response.data.data;
				const dataSectores = customArrayLanguage(language, sectores);
				setDataSectors(sectores);
				setOptionsSectors(dataSectores);
			}
		},
		[requestData]
	);

	return {
		optionsSectors,
		loading,
		error,
		adatperDataSectors,
		adatperDataChart,
		dataSectors,
		setOptionsSectors,
	};
}

export default useAxios;
