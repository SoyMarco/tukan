import { useEffect, useState, useCallback } from "react";
import { getSeriesCatalog } from "Service/services";
import useAxios from "Hooks/Axios/useAxios";
import { customArrayLanguage } from "Utils";
import {
	DataSectorsType,
	LanguageEnum,
	OptionsSelectType,
} from "Types/Dashboard";

type RequestSectors = {
	data: DataSectorsType[];
};

function useSectorsAdapter(language: LanguageEnum) {
	const [dataSectors, setDataSectors] = useState<DataSectorsType[]>();
	const [optionsSectors, setOptionsSectors] = useState<OptionsSelectType[]>([]);
	const { data, loading, error } = useAxios<RequestSectors>(getSeriesCatalog);

	const adatperDataSectors = useCallback(async () => {
		// esta en pruebas
		if (dataSectors) {
			const dataSectores = customArrayLanguage(language, dataSectors);
			setOptionsSectors(dataSectores);
			return;
		}
		if (data?.data) {
			const sectores = data.data;
			const dataSectores = customArrayLanguage(language, sectores);
			setDataSectors(sectores);
			setOptionsSectors(dataSectores);
		}
	}, [data, dataSectors, language]);

	useEffect(() => {
		adatperDataSectors();
	}, [adatperDataSectors, data]);

	return { optionsSectors, dataSectors, loading, error };
}

export default useSectorsAdapter;
