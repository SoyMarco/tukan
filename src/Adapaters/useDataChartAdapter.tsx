import { useCallback, useEffect, useState } from "react";
import { ChartSettingsType, ChartType } from "Types/Dashboard";
import { transformDataChart } from "Utils";
import { notification } from "antd";
import useLazyAxios from "Hooks/Axios/useLazyAxios";
import { getDataBanxico } from "../Service/services";

type datosSeries = {
	fecha: string;
	dato: string;
};
type SeriesType = {
	datos: datosSeries[];
	idSerie: string;
	titulo: string;
};
type ResponseChartType = {
	bmx: { series: SeriesType[] };
};

function useDataChartAdapter(formModal: ChartSettingsType) {
	const [dataChart, setDataChart] = useState<ChartType>();
	const { data, loading, error, lazyRequest } =
		useLazyAxios<ResponseChartType>();

	const adatperDataChart = useCallback(() => {
		const { tableOptions, id } = formModal;

		try {
			if (data?.bmx) {
				const transformedData = transformDataChart(
					data.bmx?.series[0]?.datos,
					tableOptions?.dateFormat
				);
				if (transformedData.length > 0) {
					const updatedCharts = {
						settings: formModal,
						data: transformedData,
						id: id,
					};
					setDataChart(updatedCharts);
				}
			}
		} catch (error) {
			notification["warning"]({
				message: "No se encontraron datos para la fecha seleccionada",
			});
		}
	}, [data, formModal]);

	const getDataChart = useCallback(() => {
		lazyRequest<ChartSettingsType>(getDataBanxico, formModal);
	}, [formModal, lazyRequest]);

	useEffect(() => {
		adatperDataChart();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return { dataChart, loading, error, getDataChart, setDataChart };
}

export default useDataChartAdapter;
