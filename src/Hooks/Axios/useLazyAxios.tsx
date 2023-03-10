import { useState, useCallback } from "react";
import { AxiosResponse } from "axios";
import { notification } from "antd";

function useLazyAxios<T>() {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const lazyRequest = useCallback(
		async <U extends {}>(
			request: (params: U) => Promise<AxiosResponse | undefined>,
			params: U
		) => {
			setLoading(true);
			try {
				const response = await request(params);
				setData(response?.data);
			} catch (err: any) {
				setError(err.message);
				notification["error"]({
					message: "Error al cargar los datos",
				});
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	return {
		loading,
		error,
		data,
		lazyRequest,
	};
}

export default useLazyAxios;
