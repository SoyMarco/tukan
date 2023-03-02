import {
	ChartEnum,
	GraficEnum,
	ChartTypePops,
	DateFormatEnum,
	DecimalsEnum,
} from "Types/Dashboard";
import { GithubPicker } from "react-color";
import BSelect from "Components/BSelect";
import { Space, InputNumber } from "antd";
import { optionsFormatDate, pressOnlyNumbers, optionsTypesGrafic } from "Utils";

function OptionsByChartType({
	chartSettings,
	updateChartSettings,
}: ChartTypePops) {
	const handleChangeColor = (color: string) => {
		updateChartSettings("graficOptions", {
			color,
			type: chartSettings.graficOptions?.type,
		});
	};
	const onChangeDecimals = (value: number) => {
		const updatedData =
			value === 0 ? DecimalsEnum.sinCeros : DecimalsEnum.dosCeros;
		updateChartSettings("tableOptions", {
			decimals: updatedData,
			dateFormat: chartSettings.tableOptions?.dateFormat,
		});
	};

	return (
		<Space direction='vertical' style={{ width: "100%", paddingLeft: 30 }}>
			{chartSettings.chartType === ChartEnum.GRAFIC && (
				<>
					Tipo de grafica
					<BSelect
						placeholder='Selecciona tipo de grafica'
						options={optionsTypesGrafic}
						value={chartSettings.graficOptions?.type}
						onChange={(value: GraficEnum) =>
							updateChartSettings("graficOptions", {
								type: value,
								color: chartSettings.graficOptions?.color,
							})
						}
					/>
					Selecciona un color
					<div style={{ display: "flex" }}>
						<GithubPicker onChangeComplete={(e) => handleChangeColor(e.hex)} />
						<div
							style={{
								backgroundColor: `${chartSettings.graficOptions?.color}`,
								height: 60,
								width: 60,
								marginLeft: 10,
							}}
						></div>
					</div>
				</>
			)}
			{chartSettings.chartType === ChartEnum.TABLE && (
				<>
					Numero de decimales
					<InputNumber
						style={{ width: "100%" }}
						min={1}
						max={10}
						defaultValue={2}
						onKeyDown={pressOnlyNumbers}
						onChange={(e) => onChangeDecimals(e ?? 2)}
					/>
					Formato de fecha
					<BSelect
						placeholder='Selecciona tabla o grafico'
						options={optionsFormatDate}
						value={chartSettings.tableOptions?.dateFormat}
						onChange={(value: DateFormatEnum) =>
							updateChartSettings("tableOptions", {
								decimals: chartSettings?.tableOptions?.decimals,
								dateFormat: value,
							})
						}
					/>
				</>
			)}
		</Space>
	);
}

export default OptionsByChartType;
