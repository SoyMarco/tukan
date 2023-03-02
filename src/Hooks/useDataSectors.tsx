import { useState, useEffect } from "react";
import useAxios from "Hooks/useAxios";
import {
	ChartSettingsType,
	dataSectores,
	LanguageEnum,
	OptionsSelectType,
} from "Types/Dashboard";

function useDataSectors({
	chartSettings,
}: {
	chartSettings: ChartSettingsType;
}) {
	const [optionsSectors, setOptionsSectors] = useState<OptionsSelectType[]>([]);
	const { data, loading, fetchData } = useAxios<dataSectores[]>("");
	useEffect(() => {
		if (!data) return;
		const dataSectores = data.map((sector: dataSectores) => {
			const label =
				chartSettings.language === LanguageEnum.ESPAÑOL
					? sector.display_name
					: sector.display_name_en;
			return {
				value: sector.variable,
				label,
			};
		});
		setOptionsSectors(dataSectores);
	}, [data, chartSettings.language]);

	return { optionsSectors, loading, fetchData };
}

export default useDataSectors;
