import { useState, useEffect } from "react";
import axios from "axios";
import { TOKENOFTUKAN, BMX_TOKEN } from "Utils";

function useAxios<T>(url: string) {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				setLoading(true);
				const headers = {
					Accept: "*/*",
					Authorization: TOKENOFTUKAN,
				};
				const params = {
					token: BMX_TOKEN,
				};

				const response = await axios.get(
					`https://5i8qcjp333.execute-api.us-east-1.amazonaws.com/dev/series/${url}`,
					{ headers, params }
				);
				const newData = url.length
					? response.data.bmx.series
					: response.data.data;
				console.log("newData", newData);
				setData(newData);
			} catch (error: any) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [url]);

	return { data, loading, error };
}

export default useAxios;
