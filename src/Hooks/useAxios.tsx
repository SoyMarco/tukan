import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { TOKENOFTUKAN, BMX_TOKEN, urlBMX, urlTUKAN } from "Utils";
import { DatesType } from "Types/Dashboard";

function useAxios<T>(seriesID: string, isChart = false, dates?: DatesType) {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = useCallback(async (): Promise<void> => {
		console.log("useAxios", seriesID, isChart, dates);
		if (loading) return;

		try {
			setLoading(true);
			const headers = {
				Accept: "*/*",
				Authorization: isChart ? null : TOKENOFTUKAN,
			};
			const params = {
				decimales: "sinCeros",
				token: BMX_TOKEN,
			};

			const URL = isChart
				? `${urlBMX}${seriesID}/datos/${dates?.startDate}/${dates?.endDate}`
				: `${urlTUKAN}`;

			if ((isChart && seriesID.length > 0) || (!isChart && !seriesID)) {
				const response = await axios.get(URL, { headers, params });
				const newData = seriesID.length
					? response.data.bmx.series[0].datos
					: response.data.data;

				setData(newData);
			}
			// para debuggear
			// console.log("newData", newData);
		} catch (error: any) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}, [seriesID, isChart, dates, loading]);

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { data, loading, error, fetchData };
}

export default useAxios;
