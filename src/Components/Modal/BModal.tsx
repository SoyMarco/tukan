import { Modal, DatePicker, Space, Button, Input } from "antd";
import { dateFormatList, optionsChartsType, optionsLanguageType } from "Utils";
import customParseFormat from "dayjs/plugin/customParseFormat";
import OptionsByChartType from "./OptionsByChartType";
import useDataSectors from "Hooks/useDataSectors";
import useDashboard from "Hooks/useChartSettings";
import { ChartEnum, ChartType } from "Types/Dashboard";
import BSelect from "Components/BSelect";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import useDataChart from "Hooks/useDataChart";
import { useEffect } from "react";
dayjs.extend(customParseFormat);

type BModalProps = {
	setIsModalOpen: (value: boolean) => void;
	addChart: (value: ChartType) => void;
};

function BModal({ setIsModalOpen, addChart }: BModalProps) {
	const { chartSettings, resetChartSettings, updateChartSettings } =
		useDashboard();
	const { optionsSectors, loading: loadSectors } = useDataSectors({
		chartSettings,
	});
	const {
		dataSerie,
		loading: loadChart,
		error,
		resetDataSerie,
		fetchData,
	} = useDataChart({
		chartSettings,
	});
	const { RangePicker } = DatePicker;

	const handleCancel = () => {
		resetChartSettings();
		setIsModalOpen(false);
	};

	const disabledEndDates = (current: Dayjs) => {
		return current && current >= dayjs().endOf("day");
	};

	const changeTitleModal = (value: string) => {
		const updatedData = value.trim() ? value.trim() : "Nuevo sector";
		updateChartSettings("titleModal", updatedData);
	};

	const setDatePicker = (_dates: any, dateStrings: string[]) => {
		const updatedData = {
			startDate: dateStrings[0],
			endDate: dateStrings[1],
		};
		updateChartSettings("dates", updatedData);
	};

	const isDisabledButton = (): boolean => {
		const { dates, sector, tableOptions, graficOptions, chartType } =
			chartSettings;
		if (!sector) return true;
		if (!dates.startDate || !dates.endDate) return true;
		// Check if options for table or grafic chart is selected
		if (chartType === ChartEnum.TABLE) {
			if (!tableOptions?.dateFormat || !tableOptions?.decimals) return true;
		}
		if (chartType === ChartEnum.GRAFIC) {
			if (!graficOptions?.color || !graficOptions?.type) return true;
		}
		// Enable button
		return false;
	};

	const handleOk = () => {
		fetchData();
	};

	useEffect(() => {
		if (dataSerie.length && !loadChart && !error) {
			const updatedCharts = {
				settings: chartSettings,
				data: dataSerie,
			};
			addChart(updatedCharts);
			resetDataSerie();
			setIsModalOpen(false);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chartSettings, dataSerie, error, loadChart]);

	return (
		<Modal
			title={`Titulo: ${chartSettings.titleModal}`}
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
					loading={loadChart || loadSectors}
				>
					Generar {chartSettings.chartType}
				</Button>,
			]}
			style={{ top: 25 }}
		>
			<Space direction='vertical' style={{ width: "90%", marginLeft: "5%" }}>
				Titulo
				<Input
					placeholder='Ingresa un titulo'
					onChange={(e) => changeTitleModal(e.target.value)}
				/>
				Idioma
				<BSelect
					placeholder='Selecciona el idioma'
					options={optionsLanguageType}
					value={chartSettings.language}
					onChange={(value) => updateChartSettings("language", value)}
				/>
				Sector
				<BSelect
					placeholder='Selecciona un sector'
					loading={loadSectors}
					options={optionsSectors}
					value={chartSettings.sector}
					onChange={(value) => updateChartSettings("sector", value)}
				/>
				Tabla o Grafica
				<BSelect
					placeholder='Selecciona tabla o grafica'
					options={optionsChartsType}
					value={chartSettings.chartType}
					onChange={(value: ChartEnum) =>
						updateChartSettings("chartType", value)
					}
				/>
				<OptionsByChartType
					chartSettings={chartSettings}
					updateChartSettings={updateChartSettings}
				/>
				Rango de fechas
				<RangePicker
					style={{ width: "100%" }}
					format={dateFormatList}
					onChange={setDatePicker}
					disabledDate={disabledEndDates}
				/>
			</Space>
		</Modal>
	);
}

export default BModal;
