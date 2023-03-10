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

function OptionsByChartType({ formModal, updateSettingsModal }: ChartTypePops) {
	const handleChangeColor = (color: string) => {
		updateSettingsModal({
			graficOptions: {
				color,
				type: formModal.graficOptions?.type,
			},
		});
	};
	return (
		<Space direction='vertical' style={{ width: "100%", paddingLeft: 30 }}>
			{formModal.chartType === ChartEnum.GRAFIC && (
				<>
					Tipo de grafica
					<BSelect
						placeholder='Selecciona tipo de grafica'
						options={optionsTypesGrafic}
						value={formModal.graficOptions?.type}
						onChange={(value: GraficEnum) =>
							updateSettingsModal({
								graficOptions: {
									type: value,
									color: formModal.graficOptions?.color,
								},
							})
						}
					/>
					Selecciona un color
					<div style={{ display: "flex" }}>
						<GithubPicker onChangeComplete={(e) => handleChangeColor(e.hex)} />
						<div
							style={{
								backgroundColor: `${formModal.graficOptions?.color}`,
								border: `${
									formModal.graficOptions?.color ? "" : "red 1px solid"
								}`,
								height: 60,
								width: 60,
								marginLeft: 10,
							}}
						></div>
					</div>
				</>
			)}
			{formModal.chartType === ChartEnum.TABLE && (
				<>
					Numero de decimales
					<BSelect
						placeholder='Selecciona numero de decimales'
						options={optionsNumeroDecimales}
						value={formModal.tableOptions?.decimals}
						onChange={(value: DecimalsEnum) =>
							updateSettingsModal({
								tableOptions: {
									decimals: value,
									dateFormat: formModal?.tableOptions?.dateFormat,
								},
							})
						}
					/>
					Formato de fecha
					<BSelect
						placeholder='Selecciona tabla o grafico'
						options={optionsFormatDate}
						value={formModal.tableOptions?.dateFormat}
						onChange={(value: DateFormatEnum) =>
							updateSettingsModal({
								tableOptions: {
									decimals: formModal?.tableOptions?.decimals,
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
