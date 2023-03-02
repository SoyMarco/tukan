export enum ChartEnum {
	TABLE = "Tabla",
	GRAFIC = "Grafica",
}
export enum GraficEnum {
	LINE = "Linea",
	COLUMN = "Columna",
	AREA = "Area",
}
export enum LanguageEnum {
	ESPAÑOL = "Español",
	ENGLISH = "English",
}

export enum DateFormatEnum {
	YYYY_MM_DD = "DD/MM/YYYY",
	DD_MM_YYYY = "DD-MM-YYYY",
	DD_MM_YY = "DD/MM/YY",
}
export enum DecimalsEnum {
	"sinCeros" = 0,
	"dosCeros" = 2,
}
export type TableOptionsType = {
	decimals?: DecimalsEnum;
	dateFormat?: DateFormatEnum;
};
export type GraficConfigType = {
	color?: string;
	type?: GraficEnum;
};
export type DatesType = {
	startDate: string | undefined;
	endDate: string | undefined;
};
export type ChartSettingsType = {
	id: number;
	titleModal: string;
	chartType: ChartEnum;
	dates: DatesType;
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
export type OptionsSelectType = {
	value: string;
	label: string;
};

export interface ChartTypePops {
	chartSettings: ChartSettingsType;
	updateChartSettings: <T extends keyof ChartSettingsType>(
		prop: T,
		value: ChartSettingsType[T]
	) => void;
}
export type DataChart = {
	fecha: string;
	dato?: string;
	datoN?: number;
};
export type ChartType = {
	settings: ChartSettingsType;
	data: DataChart[];
};
