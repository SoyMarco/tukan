import {
	ChartEnum,
	GraficEnum,
	ChartTypePops,
	DateFormatEnum,
	DecimalsEnum,
} from "Types/Dashboard";
import { GithubPicker } from "react-color";
import BSelect from "Components/AntD/BSelect/BSelect";
import { Space } from "antd";
import {
	optionsFormatDate,
	optionsTypesGrafic,
	optionsNumeroDecimales,
} from "Utils";

function OptionsByChartType({
	settingsModal,
	updateSettingsModal,
}: ChartTypePops) {
	const handleChangeColor = (color: string) => {
		updateSettingsModal({
			graficOptions: {
				color,
				type: settingsModal.graficOptions?.type,
			},
		});
	};
	return (
		<Space direction='vertical' style={{ width: "100%", paddingLeft: 30 }}>
			{settingsModal.chartType === ChartEnum.GRAFIC && (
				<>
					Tipo de grafica
					<BSelect
						placeholder='Selecciona tipo de grafica'
						options={optionsTypesGrafic}
						value={settingsModal.graficOptions?.type}
						onChange={(value: GraficEnum) =>
							updateSettingsModal({
								graficOptions: {
									type: value,
									color: settingsModal.graficOptions?.color,
								},
							})
						}
					/>
					Selecciona un color
					<div style={{ display: "flex" }}>
						<GithubPicker onChangeComplete={(e) => handleChangeColor(e.hex)} />
						<div
							style={{
								backgroundColor: `${settingsModal.graficOptions?.color}`,
								border: `${
									settingsModal.graficOptions?.color ? "" : "red 1px solid"
								}`,
								height: 60,
								width: 60,
								marginLeft: 10,
							}}
						></div>
					</div>
				</>
			)}
			{settingsModal.chartType === ChartEnum.TABLE && (
				<>
					Numero de decimales
					<BSelect
						placeholder='Selecciona numero de decimales'
						options={optionsNumeroDecimales}
						value={settingsModal.tableOptions?.decimals}
						onChange={(value: DecimalsEnum) =>
							updateSettingsModal({
								tableOptions: {
									decimals: value,
									dateFormat: settingsModal?.tableOptions?.dateFormat,
								},
							})
						}
					/>
					Formato de fecha
					<BSelect
						placeholder='Selecciona tabla o grafico'
						options={optionsFormatDate}
						value={settingsModal.tableOptions?.dateFormat}
						onChange={(value: DateFormatEnum) =>
							updateSettingsModal({
								tableOptions: {
									decimals: settingsModal?.tableOptions?.decimals,
									dateFormat: value,
								},
							})
						}
					/>
				</>
			)}
		</Space>
	);
}

export default OptionsByChartType;
