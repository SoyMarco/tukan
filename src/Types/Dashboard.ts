export enum ChartEnum {
	TABLE = "Tabla",
	GRAFIC = "Grafica",
}
export enum ActionModalEnum {
	CREATE = "Crear",
	UPDATE = "Actualizar",
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
	YYYY_MM_DD = "YYYY-MM-DD",
	YY_MM_DD = "YY-MM-DD",
	DD_MM_YY = "DD/MM/YY",
}
export enum DecimalsEnum {
	"sinCeros" = "Sin Ceros",
	"dosCeros" = "Con Ceros",
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
	id: string;
	titleModal: string;
	chartType: ChartEnum;
	dates: DatesType;
	language: LanguageEnum;
	tableOptions?: TableOptionsType;
	graficOptions?: GraficConfigType;
	sector: string;
	nameSector: string;
	action: ActionModalEnum;
};

export type DataSectorsType = {
	display_name: string;
	display_name_en: string;
	unit_id: string;
	variable: string;
};
export type Sector = {
	sectores: DataSectorsType[];
};
export type OptionsSelectType = {
	value: string;
	label: string;
};

export interface ChartTypePops {
	settingsModal: ChartSettingsType;
	updateSettingsModal: (value: Partial<ChartSettingsType>) => void;
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

export type UseDashboardType = UseNewChart & {
	dataDashboards: ChartType[];
	createChart: (chart: ChartType) => void;
	readChart: (chart: ChartType) => void;
	deleteChart: (id: string) => void;
	updateChart: (chart: ChartType) => void;
	createDashboard: (charts: ChartType[]) => void;
};

export type UseNewChart = {
	settingsModal: ChartSettingsType;
	updateSettingsModal: (value: Partial<ChartSettingsType>) => void;
	openModal: () => void;
	isModalOpen: boolean;
	closeModal: () => void;
};

export type ContextDashboardType = UseDashboardType;

export type UseLocalStorashType = {
	setIsOpenModal: (value: boolean) => void;
	isOpenModal: boolean;
	deleteStoragereloadWindow: () => void;
	handleAcceptSaveStorage: () => void;
};
