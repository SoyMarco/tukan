export enum ChartEnum {
	TABLE = "Tabla",
	GRAFIC = "Grafica",
}
export enum GraficEnum {
	LINE = "Lineas",
	BAR = "Barrras",
}
export enum LanguageEnum {
	ESPAÑOL = "Español",
	ENGLISH = "English",
}
export type LanguageType = LanguageEnum;

export enum DateFormatType {
	"LL",
	"L",
}
export type TableOptionsType = {
	decimals: number;
	dateFormat: DateFormatType;
};
export type GraficConfigType = {
	color: string;
	type: GraficEnum;
};
export type DashboardType = {
	id: number;
	chartType: ChartEnum | undefined;
	startDate: Date;
	endDate: Date;
	title: string;
	language: string;
	tableOptions?: TableOptionsType;
	graficOptions?: GraficConfigType;
};

export type dataSectores = {
	display_name: string;
	display_name_en: string;
	unit_id: string;
	variable: string;
};
export type Sector = {
	sectores: dataSectores[];
};
export type OptionsSectoresType = {
	value: string;
	label: string;
};
