import { BMX_TOKEN, TOKENOFTUKAN, URL_TUKAN } from "Utils";
import { ChartSettingsType, DecimalsEnum } from "Types/Dashboard";
import axios, { AxiosResponse } from "axios";

const headers = {
	Accept: "*/*",
	Authorization: TOKENOFTUKAN,
};

export const getSeriesCatalog = async (): Promise<
	AxiosResponse | undefined
> => {
	const params = {
		token: BMX_TOKEN,
	};
	return await axios.get(URL_TUKAN, { headers, params });
};

export const getDataBanxico = async (
	settingsModal: ChartSettingsType
): Promise<AxiosResponse | undefined> => {
	const { dates, sector, tableOptions } = settingsModal;
	const sinCeros = tableOptions?.decimals;
	const params = {
		token: BMX_TOKEN,
		decimales: sinCeros === DecimalsEnum.sinCeros ? "sinCeros" : null,
	};
	const URL_CUSTOM = `${URL_TUKAN}${sector}/${dates?.startDate}/${dates?.endDate}`;
	return await axios.get(URL_CUSTOM, { headers, params });
};
