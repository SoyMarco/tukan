import { useContext, useEffect, useMemo, useCallback } from "react";
import OptionsByChartType from "Components/Modal/Options/OptionsByChartType";
import ContextDashboard from "Context/Dashboard/ContextDashboard";
import { Modal, DatePicker, Space, Button, Input } from "antd";
import {
	customArrayLanguage,
	optionsChartsType,
	optionsLanguageType,
} from "Utils";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ActionModalEnum, ChartEnum, LanguageEnum } from "Types/Dashboard";
import BSelect from "Components/AntD/BSelect/BSelect";
import useAxios from "Hooks/useAxios/useAxios";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

dayjs.extend(customParseFormat);

function SettingsModal() {
	const {
		closeModal,
		createChart,
		settingsModal,
		updateSettingsModal,
		updateChart,
		isModalOpen,
	} = useContext(ContextDashboard);

	const { RangePicker } = DatePicker;

	const {
		optionsSectors,
		loading,
		adatperDataSectors,
		adatperDataChart,
		dataSectors,
		setOptionsSectors,
	} = useAxios();

	useEffect(() => {
		adatperDataSectors(settingsModal.language);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [settingsModal.language]);

	useEffect(() => {
		handleChangeSector(settingsModal.sector);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [optionsSectors]);

	const disabledEndDates = (current: Dayjs) => {
		return current && current >= dayjs().endOf("day");
	};

	const changeTitleModal = (value: string) => {
		const updatedData = value.trim();
		updateSettingsModal({ titleModal: updatedData });
	};

	const setDatePicker = (_dates: any, dateStrings: string[]) => {
		const updatedData = {
			startDate: dateStrings[0],
			endDate: dateStrings[1],
		};
		updateSettingsModal({ dates: updatedData });
	};

	const isDisabledButton = useMemo((): boolean => {
		const { dates, sector, tableOptions, graficOptions, chartType } =
			settingsModal;
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
	}, [settingsModal]);

	const handleOk = async () => {
		const updatedCharts = await adatperDataChart(settingsModal);
		if (!updatedCharts) return;

		if (settingsModal.action === ActionModalEnum.CREATE) {
			createChart(updatedCharts);
		}
		if (settingsModal.action === ActionModalEnum.UPDATE) {
			updateChart(updatedCharts);
		}
	};
	const handleChangeSector = (value: string) => {
		const currentSector = optionsSectors.find(
			(sector) => sector.value === value
		);
		if (!currentSector) return;
		updateSettingsModal({
			nameSector: currentSector.label,
			sector: value,
		});
	};
	const datesModal = useMemo(
		() => [
			dayjs(
				settingsModal.dates.startDate,
				settingsModal?.tableOptions?.dateFormat ?? "YYYY-MM-DD"
			),
			dayjs(
				settingsModal.dates.endDate,
				settingsModal?.tableOptions?.dateFormat ?? "YYYY-MM-DD"
			),
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[settingsModal?.tableOptions?.dateFormat]
	);
	const [startDate, endDate] = datesModal;

	const changeLanguage = useCallback(
		(value: string) => {
			const newLanguage: LanguageEnum =
				value === "Español" ? LanguageEnum.ESPAÑOL : LanguageEnum.ENGLISH;
			const currentSector = optionsSectors.find(
				(sector) => sector.value === settingsModal.sector
			);

			if (!currentSector || !value || !dataSectors) return;
			const dataSectores = customArrayLanguage(newLanguage, dataSectors);

			setOptionsSectors(dataSectores);
			updateSettingsModal({
				nameSector: currentSector.label,
				sector: currentSector.value,
				language: newLanguage,
			});
		},
		[
			dataSectors,
			optionsSectors,
			setOptionsSectors,
			settingsModal.sector,
			updateSettingsModal,
		]
	);
	return (
		<Modal
			title={`Titulo: ${settingsModal.titleModal}`}
			open={isModalOpen}
			onOk={handleOk}
			onCancel={closeModal}
			footer={[
				<Button key='back' onClick={closeModal}>
					Cancelar
				</Button>,
				<Button
					key='submit'
					type='primary'
					onClick={handleOk}
					disabled={isDisabledButton || loading}
					loading={loading}
				>
					{settingsModal.action} {settingsModal.chartType}
				</Button>,
			]}
			style={{ top: 25 }}
		>
			<Space direction='vertical' style={{ width: "90%", marginLeft: "5%" }}>
				Titulo
				<Input
					value={settingsModal.titleModal}
					placeholder='Ingresa un titulo'
					onChange={(e) => changeTitleModal(e.target.value)}
				/>
				Idioma
				<BSelect
					placeholder='Selecciona el idioma'
					options={optionsLanguageType}
					value={settingsModal.language}
					onChange={(value) => changeLanguage(value)}
				/>
				Sector
				<BSelect
					placeholder='Selecciona un sector'
					loading={loading}
					options={optionsSectors}
					value={settingsModal.sector}
					onChange={(value) => handleChangeSector(value)}
				/>
				Tabla o Grafica
				<BSelect
					placeholder='Selecciona tabla o grafica'
					options={optionsChartsType}
					value={settingsModal.chartType}
					onChange={(value: ChartEnum) =>
						updateSettingsModal({ chartType: value })
					}
				/>
				<OptionsByChartType
					settingsModal={settingsModal}
					updateSettingsModal={updateSettingsModal}
				/>
				Rango de fechas
				<RangePicker
					defaultValue={[startDate, endDate]}
					style={{ width: "100%" }}
					format={settingsModal.tableOptions?.dateFormat}
					onChange={setDatePicker}
					disabledDate={disabledEndDates}
				/>
			</Space>
		</Modal>
	);
}

export default SettingsModal;
