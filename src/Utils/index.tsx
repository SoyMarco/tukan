import {
	ChartEnum,
	DateFormatType,
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
export const BMX_TOKEN = {
	"Bmx-Token":
		"07cca3ed89476a61b43719abc500b5f4cf5ef87dee8994c41bb121728ca06068",
};

export const initialDataDashboard = {
	id: 0,
	chartType: undefined,
	startDate: new Date(),
	endDate: new Date(),
	title: "Nuevo Dashboard",
	language: "Español",
	tableOptions: { decimals: 2, dateFormat: DateFormatType.L },
	graficOptions: { color: "blue", type: GraficEnum.LINE },
};

export const optionsChartsType = [
	{ value: ChartEnum.TABLE, label: ChartEnum.TABLE },

	{ value: ChartEnum.GRAFIC, label: ChartEnum.GRAFIC },
];
export const optionsTypesGrafic = [
	{ value: GraficEnum.BAR, label: GraficEnum.BAR },

	{ value: GraficEnum.LINE, label: GraficEnum.LINE },
];
export const optionsLanguageType = [
	{ value: LanguageEnum.ESPAÑOL, label: LanguageEnum.ESPAÑOL },

	{ value: LanguageEnum.ENGLISH, label: LanguageEnum.ENGLISH },
];
export const optionsFormatDate = [
	{ value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
	{ value: "DD-MM-YYYY", label: "DD-MM-YYYY" },
	{ value: "DD/MM/YY", label: "DD/MM/YY" },
];
export const dateFormatList = ["DD/MM/YYYY"];
