import { useContext } from "react";
import OptionsByChartType from "Components/Modal/FormModal/Options/OptionsByChartType";
import ContextDashboard from "Context/Dashboard/ContextDashboard";
import { Modal, DatePicker, Space, Button, Input } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { optionsChartsType, optionsLanguageType } from "Utils";
import BSelect from "Components/AntD/BSelect/BSelect";
import useControllerForm from "./useControllerForm";
import { ChartEnum } from "Types/Dashboard";
import dayjs from "dayjs";

dayjs.extend(customParseFormat);

function FormModal() {
	const { closeModal, formModal, updateSettingsModal, isModalOpen } =
		useContext(ContextDashboard);

	const { language, sector, titleModal, action, tableOptions, chartType } =
		formModal;

	const {
		handleChangeSector,
		disabledEndDates,
		isDisabledButton,
		changeTitleModal,
		changeLanguage,
		setDatePicker,
		handleSubmit,
		optionsSectors,
		loadSectors,
		loadChart,
		startDate,
		endDate,
	} = useControllerForm();

	const { RangePicker } = DatePicker;

	return (
		<Modal
			title={`Titulo: ${titleModal}`}
			open={isModalOpen}
			onOk={handleSubmit}
			onCancel={closeModal}
			footer={[
				<Button key='back' onClick={closeModal}>
					Cancelar
				</Button>,
				<Button
					key='submit'
					type='primary'
					onClick={handleSubmit}
					disabled={isDisabledButton() || loadChart}
					loading={loadChart}
				>
					{action} {chartType}
				</Button>,
			]}
			style={{ top: 25 }}
		>
			<Space direction='vertical' style={{ width: "90%", marginLeft: "5%" }}>
				Titulo
				<Input
					value={titleModal}
					placeholder='Ingresa un titulo'
					onChange={({ target }) => changeTitleModal(target.value)}
				/>
				Idioma
				<BSelect
					placeholder='Selecciona el idioma'
					options={optionsLanguageType}
					value={language}
					onChange={(value) => changeLanguage(value)}
				/>
				Sector
				<BSelect
					placeholder='Selecciona un sector'
					placement='topLeft'
					loading={loadSectors}
					options={optionsSectors}
					value={sector}
					onChange={(value) => handleChangeSector(value)}
				/>
				Tabla o Grafica
				<BSelect
					placeholder='Selecciona tabla o grafica'
					options={optionsChartsType}
					value={chartType}
					onChange={(value: ChartEnum) =>
						updateSettingsModal({ chartType: value })
					}
				/>
				<OptionsByChartType
					formModal={formModal}
					updateSettingsModal={updateSettingsModal}
				/>
				Rango de fechas
				<RangePicker
					value={[startDate, endDate]}
					style={{ width: "100%" }}
					format={tableOptions?.dateFormat}
					onChange={setDatePicker}
					disabledDate={disabledEndDates}
					allowClear={false}
				/>
			</Space>
		</Modal>
	);
}

export default FormModal;
