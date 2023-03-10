import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { notification } from "antd";

function useAxios<T>(request: () => Promise<AxiosResponse | undefined>) {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isActive = true;
		if (data) return;
		setLoading(true);
		request()
			.then((response) => {
				if (isActive) setData(response?.data);
			})
			.catch((err) => {
				setError(err.message);
				notification["error"]({
					message: "Error al cargar los datos",
				});
			})
			.finally(() => {
				setLoading(false);
			});
		return () => {
			isActive = false;
		};
	}, [data, request]);

	return {
		loading,
		error,
		data,
	};
}

export default useAxios;
