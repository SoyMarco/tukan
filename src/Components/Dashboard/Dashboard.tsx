import { Row, Col, Button } from "antd";
import { ChartEnum, ChartType } from "Types/Dashboard";
import ChartGrafics from "./ChartGrafics";
import ChartTable from "./ChartTable";

function Dashboard({
	dataCharts,
	removeChart,
}: {
	dataCharts: ChartType[];
	removeChart: (id: number) => void;
}) {
	return (
		<Row gutter={[12, 12]} justify='space-around'>
			{dataCharts.map((chart) => (
				<Col
					xs={23}
					sm={11}
					md={11}
					lg={7}
					style={{
						boxShadow: "10px 6px 20px 5px #8b8b8b, -6px 0px 20px #ffffff",
						background: "white",
					}}
				>
					<Row justify='space-between'>
						<h1>{chart.settings.titleModal}</h1>
						<Button danger onClick={() => removeChart(chart.settings.id)}>
							X
						</Button>
					</Row>
					{chart.settings.chartType === ChartEnum.TABLE ? (
						<ChartTable data={chart.data} settings={chart.settings} />
					) : (
						<ChartGrafics data={chart.data} settings={chart.settings} />
					)}
				</Col>
			))}
		</Row>
	);
}

export default Dashboard;
