import { useState, useEffect } from "react";
import { ChartSettingsType, DataChart } from "Types/Dashboard";
import useAxios from "Hooks/useAxios";

function useDataChart({ chartSettings }: { chartSettings: ChartSettingsType }) {
	const [dataSerie, setDataSerie] = useState<DataChart[]>([]);
	const { sector, dates } = chartSettings;

	const { data, loading, error, fetchData } = useAxios<DataChart[]>(
		sector,
		true,
		dates
	);
	useEffect(() => {
		if (!data) return;
		console.log("useDataChart@", data);
		const newArray = data.map((item) => {
			return {
				fecha: item.fecha,
				datoN: parseFloat(item?.dato?.replace(",", "").replace(".", "") ?? "0"),
			};
		});

		setDataSerie(newArray);
	}, [data]);

	const resetDataSerie = () => {
		setDataSerie([]);
	};

	return { dataSerie, resetDataSerie, loading, error, fetchData };
}

export default useDataChart;
