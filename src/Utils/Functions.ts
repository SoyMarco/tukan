import {
	DataChart,
	DataSectorsType,
	DateFormatEnum,
	LanguageEnum,
} from "Types/Dashboard";
import dayjs from "dayjs";
import html2canvas from "html2canvas";

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

export const pasarStringANumero = (dato: string): number => {
	const strSinComa = dato.replace(",", "");
	const strSinComaYPunto = strSinComa.replace(".", "");
	const num = parseFloat(strSinComaYPunto);
	return num;
};

export const selectID = (input: string) => {
	const inputHTML = (document.getElementById(input) as HTMLInputElement)!;
	inputHTML.select();
};

export const downloadImage = (id: string, title: string) => {
	const image = document.getElementById(id.toString());
	if (!image) return;
	hideBtns();

	html2canvas(image).then((canvas) => {
		const image = canvas.toDataURL("image/png");
		const link = document.createElement("a");
		link.download = title;
		link.href = image;
		link.click();
	});
	showButtons();
};

export const hideBtns = () => {
	const buttons = document.getElementsByTagName("button");
	for (const element of buttons) {
		element.style.display = "none";
	}
};

export const showButtons = () => {
	const buttons = document.getElementsByTagName("button");
	for (const element of buttons) {
		element.style.display = "inline-block";
	}
};
