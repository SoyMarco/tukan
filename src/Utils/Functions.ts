import {
	DataChart,
	DataSectorsType,
	DateFormatEnum,
	LanguageEnum,
} from "Types/Dashboard";
import dayjs from "dayjs";

export const pressOnlyNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
	if (!/\d/.test(e.key)) {
		e.preventDefault();
	}
};

export const customArrayLanguage = (
	language: LanguageEnum,
	sectores: DataSectorsType[]
) => {
	return sectores.map((sector: DataSectorsType) => {
		const label =
			language === LanguageEnum.ESPAÑOL
				? sector.display_name
				: sector.display_name_en;
		return {
			value: sector.variable,
			label,
		};
	});
};

export const customFormatDate = (fecha: string, dateFormat: DateFormatEnum) => {
	const nuevaFecha = dayjs(fecha, "DD/MM/YYYY").format(dateFormat);
	return nuevaFecha;
};
export const transformDataChart = (
	data: DataChart[],
	dateFormat?: DateFormatEnum
) =>
	data.map((item: DataChart) => {
		if (!dateFormat)
			return {
				fecha: item.fecha,
				datoN: pasarStringANumero(item.dato ?? "0"),
			};
		return {
			fecha: customFormatDate(item.fecha, dateFormat),
			datoN: pasarStringANumero(item.dato ?? "0"),
		};
	});

const pasarStringANumero = (dato: string): number => {
	const strSinComa = dato.replace(",", "");
	const strSinComaYPunto = strSinComa.replace(".", "");
	const num = parseFloat(strSinComaYPunto);
	return num;
};
