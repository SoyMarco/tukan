import { useState, useEffect } from "react";
import {
	Modal,
	Select,
	DatePicker,
	Space,
	InputNumber,
	Button,
	Input,
} from "antd";
import useAxios from "Hooks/useAxios";
import {
	ChartEnum,
	dataSectores,
	LanguageEnum,
	OptionsSectoresType,
} from "Types/Dashboard";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { Dayjs } from "dayjs";
import { GithubPicker } from "react-color";
import {
	dateFormatList,
	optionsChartsType,
	optionsFormatDate,
	optionsLanguageType,
	optionsTypesGrafic,
	pressOnlyNumbers,
} from "Utils";
import useDashboard from "Hooks/useDashboard";

dayjs.extend(customParseFormat);

function BModal({
	setIsModalOpen,
}: {
	setIsModalOpen: (value: boolean) => void;
}) {
	const {
		dataDashboard,
		setChartType,
		resetDataDashboard,
		setLanguageType,
		setSector,
		setColorPicker,
		setDatePicker,
	} = useDashboard();

	const [optionsSectores, setoptionsSectores] = useState<OptionsSectoresType[]>(
		[]
	);
	const [titleModal, setTitleModal] = useState("Nuevo sector");
	const { RangePicker } = DatePicker;
	const { data } = useAxios<dataSectores[]>("");

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		resetDataDashboard();
		setIsModalOpen(false);
	};
	useEffect(() => {
		if (data) {
			setoptionsSectores(
				data.map((sector: dataSectores) => {
					const labelIdiom =
						dataDashboard.language === LanguageEnum.ESPAÑOL
							? sector.display_name
							: sector.display_name_en;
					return {
						value: sector.variable,
						label: labelIdiom,
					};
				})
			);
		}
	}, [data, dataDashboard.language]);

	function disabledEndDate(current: Dayjs) {
		return current && current >= dayjs().endOf("day");
	}
	const onChangeDecimals = (value: number) => {
		console.log("changed", value);
	};

	const handleChangeComplete = (color: string) => {
		setColorPicker(color);
	};
	const isDisabledButton = (): boolean => {
		if (dataDashboard.chartType) {
			return false;
		}
		return true;
	};
	const changeTitleModal = (value: string) => {
		setTitleModal(value.trim() ? value.trim() : "Nuevo sector");
	};
	return (
		<Modal
			title={`Titulo: ${titleModal}`}
			open={true}
			onOk={handleOk}
			onCancel={handleCancel}
			footer={[
				<Button key='back' onClick={handleCancel}>
					Cancelar
				</Button>,
				<Button
					key='submit'
					type='primary'
					onClick={handleOk}
					disabled={isDisabledButton()}
				>
					Generar {dataDashboard.chartType}
				</Button>,
			]}
			style={{ top: 25 }}
		>
			<Space direction='vertical' style={{ width: "100%" }}>
				Titulo
				<Input
					style={{ width: "80%" }}
					placeholder='Ingresa un titulo'
					onChange={({ target }) => changeTitleModal(target.value)}
				/>
				Idioma
				<Select
					defaultValue={LanguageEnum.ESPAÑOL}
					showSearch
					style={{ width: "80%" }}
					placeholder='Selecciona el idioma'
					optionFilterProp='children'
					filterOption={(input, option) =>
						(option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
					}
					filterSort={(optionA, optionB) =>
						(optionA?.label ?? "")
							.toLowerCase()
							.localeCompare((optionB?.label ?? "").toLowerCase())
					}
					options={optionsLanguageType}
					onChange={(e) => setLanguageType(e)}
				/>
				Sector
				<Select
					showSearch
					style={{ width: "80%" }}
					placeholder='Selecciona un sector'
					optionFilterProp='children'
					filterOption={(input, option) =>
						(option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
					}
					filterSort={(optionA, optionB) =>
						(optionA?.label ?? "")
							.toLowerCase()
							.localeCompare((optionB?.label ?? "").toLowerCase())
					}
					options={optionsSectores}
					onChange={(e) => setSector(e)}
				/>
				Tabla o Grafica
				<Select
					showSearch
					style={{ width: "80%" }}
					placeholder='Selecciona tabla o grafica'
					optionFilterProp='children'
					filterOption={(input, option) =>
						(option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
					}
					filterSort={(optionA, optionB) =>
						(optionA?.label ?? "")
							.toLowerCase()
							.localeCompare((optionB?.label ?? "").toLowerCase())
					}
					options={optionsChartsType}
					onChange={(e) => setChartType(e)}
				/>
				{dataDashboard.chartType === ChartEnum.TABLE && (
					// <div style={{ paddingLeft: 20, display: "block" }}>
					<Space
						direction='vertical'
						style={{ width: "100%", paddingLeft: 30 }}
					>
						Numero de decimales
						<InputNumber
							min={1}
							max={10}
							defaultValue={2}
							style={{ width: "80%" }}
							onKeyDown={pressOnlyNumbers}
							onChange={(e) => onChangeDecimals(e ?? 2)}
						/>
						Formato de fecha
						<Select
							showSearch
							style={{ width: "80%" }}
							placeholder='Selecciona tabla o grafico'
							optionFilterProp='children'
							filterOption={(input, option) =>
								(option?.label.toLowerCase() ?? "").includes(
									input.toLowerCase()
								)
							}
							filterSort={(optionA, optionB) =>
								(optionA?.label ?? "")
									.toLowerCase()
									.localeCompare((optionB?.label ?? "").toLowerCase())
							}
							options={optionsFormatDate}
							onChange={(e) => setChartType(e)}
						/>
					</Space>
				)}
				{dataDashboard.chartType === ChartEnum.GRAFIC && (
					<Space
						direction='vertical'
						style={{ width: "100%", paddingLeft: 30 }}
					>
						Tipo de grafica
						<Select
							showSearch
							style={{ width: "80%" }}
							placeholder='Selecciona tipo de grafica'
							optionFilterProp='children'
							filterOption={(input, option) =>
								(option?.label.toLowerCase() ?? "").includes(
									input.toLowerCase()
								)
							}
							filterSort={(optionA, optionB) =>
								(optionA?.label ?? "")
									.toLowerCase()
									.localeCompare((optionB?.label ?? "").toLowerCase())
							}
							options={optionsTypesGrafic}
							// onChange={(e) => setChartType(e)}
						/>
						Selecciona un color
						<div style={{ display: "flex" }}>
							<GithubPicker
								onChangeComplete={(e) => handleChangeComplete(e.hex)}
							/>
							<div
								style={{
									backgroundColor: `${dataDashboard.graficOptions?.color}`,
									height: 60,
									width: 60,
									marginLeft: 10,
								}}
							></div>
						</div>
					</Space>
				)}
				Rango de fechas
				<RangePicker
					// defaultValue={dayjs("01/01/2015", dateFormatList[0])}
					style={{ width: "80%" }}
					format={dateFormatList}
					onChange={setDatePicker}
					disabledDate={disabledEndDate}
				/>
			</Space>
		</Modal>
	);
}

export default BModal;
