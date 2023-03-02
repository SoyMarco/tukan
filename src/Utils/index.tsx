import {
	ChartEnum,
	DateFormatEnum,
	GraficEnum,
	LanguageEnum,
} from "Types/Dashboard";

export const pressOnlyNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
	if (!/\d/.test(e.key)) {
		e.preventDefault();
	}
};

export const TOKENOFTUKAN =
	"01f04831044f073702d9244604d41c055e7c14bb96218e169926482fb5699788";
export const BMX_TOKEN =
	"07cca3ed89476a61b43719abc500b5f4cf5ef87dee8994c41bb121728ca06068";
export const backTukan = `https://5i8qcjp333.execute-api.us-east-1.amazonaws.com/dev/series/SF43771`;
export const backBanxico = `https://www.banxico.org.mx/SieAPIRest/service/v1/series/SP68257`;
export const urlTUKAN =
	"https://5i8qcjp333.execute-api.us-east-1.amazonaws.com/dev/series/";
export const urlBMX = `https://www.banxico.org.mx/SieAPIRest/service/v1/series/`;

export const initialDataDashboard = {
	id: 0,
	titleModal: "Nuevo sector",
	chartType: ChartEnum.TABLE,
	dates: { startDate: undefined, endDate: undefined },
	title: "Nuevo Dashboard",
	language: "Español",
	tableOptions: { decimals: 2, dateFormat: DateFormatEnum.YYYY_MM_DD },
	graficOptions: undefined, //{ color: "blue", type: GraficEnum.LINE },
	sector: "",
};

export const optionsChartsType = [
	{ value: ChartEnum.TABLE, label: ChartEnum.TABLE },
	{ value: ChartEnum.GRAFIC, label: ChartEnum.GRAFIC },
];
export const optionsTypesGrafic = [
	{ value: GraficEnum.COLUMN, label: GraficEnum.COLUMN },
	{ value: GraficEnum.LINE, label: GraficEnum.LINE },
	{ value: GraficEnum.AREA, label: GraficEnum.AREA },
];
export const optionsLanguageType = [
	{ value: LanguageEnum.ESPAÑOL, label: LanguageEnum.ESPAÑOL },

	{ value: LanguageEnum.ENGLISH, label: LanguageEnum.ENGLISH },
];
export const optionsFormatDate = [
	{ value: DateFormatEnum.DD_MM_YY, label: DateFormatEnum.DD_MM_YY },
	{ value: DateFormatEnum.DD_MM_YYYY, label: DateFormatEnum.DD_MM_YYYY },
	{ value: DateFormatEnum.YYYY_MM_DD, label: DateFormatEnum.YYYY_MM_DD },
];
export const dateFormatList = ["YYYY-MM-DD"];
