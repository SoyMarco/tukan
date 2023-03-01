import { useState, useEffect } from "react";
import axios from "axios";

function useAxios<T>(url: string) {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				setLoading(true);
				let headersList = {
					AccessControlAllowOrigin: "*/*", // permitir solicitudes CORS desde cualquier origen
					Authorization:
						"01f04831044f073702d9244604d41c055e7c14bb96218e169926482fb5699788",
					"Bmx-Token":
						"07cca3ed89476a61b43719abc500b5f4cf5ef87dee8994c41bb121728ca06068",
				};

				let reqOptions = {
					url: "https://5i8qcjp333.execute-api.us-east-1.amazonaws.com/dev/series/SF43771",
					method: "GET",
					headers: headersList,
				};

				let response = await axios.request(reqOptions);
				console.log(response.data);
				setData(response.data.data);
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
