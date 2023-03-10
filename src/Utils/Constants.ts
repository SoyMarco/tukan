import dayjs from "dayjs";
import {
	ActionModalEnum,
	ChartEnum,
	DateFormatEnum,
	DecimalsEnum,
	GraficEnum,
	LanguageEnum,
} from "Types/Dashboard";

export const backTukan = `https://5i8qcjp333.execute-api.us-east-1.amazonaws.com/dev/series/SF43771`;
export const backBanxico = `https://www.banxico.org.mx/SieAPIRest/service/v1/series/SP68257`;
export const URL_BMX = `https://www.banxico.org.mx/SieAPIRest/service/v1/series/`;
export const URL_TUKAN =
	"https://5i8qcjp333.execute-api.us-east-1.amazonaws.com/dev/series/";
export const TOKENOFTUKAN =
	"01f04831044f073702d9244604d41c055e7c14bb96218e169926482fb5699788";
export const BMX_TOKEN =
	"07cca3ed89476a61b43719abc500b5f4cf5ef87dee8994c41bb121728ca06068";

export const optionsFormatDate = [
	{ value: DateFormatEnum.DD_MM_YY, label: DateFormatEnum.DD_MM_YY },
	{ value: DateFormatEnum.YY_MM_DD, label: DateFormatEnum.YY_MM_DD },
	{ value: DateFormatEnum.YYYY_MM_DD, label: DateFormatEnum.YYYY_MM_DD },
];
export const optionsNumeroDecimales = [
	{ value: DecimalsEnum.dosCeros, label: DecimalsEnum.dosCeros },
	{ value: DecimalsEnum.sinCeros, label: DecimalsEnum.sinCeros },
];
export const optionsLanguageType = [
	{ value: LanguageEnum.ESPAÑOL, label: LanguageEnum.ESPAÑOL },

	{ value: LanguageEnum.ENGLISH, label: LanguageEnum.ENGLISH },
];
export const optionsTypesGrafic = [
	{ value: GraficEnum.COLUMN, label: GraficEnum.COLUMN },
	{ value: GraficEnum.LINE, label: GraficEnum.LINE },
	{ value: GraficEnum.AREA, label: GraficEnum.AREA },
];
export const optionsChartsType = [
	{ value: ChartEnum.TABLE, label: ChartEnum.TABLE },
	{ value: ChartEnum.GRAFIC, label: ChartEnum.GRAFIC },
];
export const dateFormatList = [
	DateFormatEnum.YYYY_MM_DD,
	DateFormatEnum.DD_MM_YY,
	DateFormatEnum.YY_MM_DD,
];

const today = dayjs().format("YYYY-MM-DD");
const twentyDaysAgo = dayjs().subtract(1, "month").format("YYYY-MM-DD");
export const initialDataFormModal = {
	id: new Date().getTime().toString(),
	titleModal: "Nuevo sector",
	chartType: ChartEnum.TABLE,
	dates: { startDate: twentyDaysAgo, endDate: today },
	language: LanguageEnum.ESPAÑOL,
	tableOptions: {
		decimals: DecimalsEnum.sinCeros,
		dateFormat: DateFormatEnum.YYYY_MM_DD,
	},
	graficOptions: undefined, //{ color: "blue", type: GraficEnum.LINE },
	sector: "",
	nameSector: "",
	action: ActionModalEnum.CREATE,
};
