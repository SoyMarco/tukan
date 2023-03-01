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

export enum DateFormatEnum {
	YYYY_MM_DD = "DD/MM/YYYY",
	DD_MM_YYYY = "DD-MM-YYYY",
	DD_MM_YY = "DD/MM/YY",
}

export type TableOptionsType = {
	decimals?: number;
	dateFormat?: DateFormatEnum;
};
export type GraficConfigType = {
	color?: string;
	type?: GraficEnum;
};
export type DashboardType = {
	id: number;
	chartType: ChartEnum | undefined;
	startDate: string | undefined;
	endDate: string | undefined;
	title: string;
	language: string;
	tableOptions?: TableOptionsType;
	graficOptions?: GraficConfigType;
	sector: string;
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
