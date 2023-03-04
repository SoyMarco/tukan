import { Row, Col, Button } from "antd";
import { ChartEnum } from "Types/Dashboard";
import ChartGrafics from "./ChartGrafics";
import ChartTable from "./ChartTable";
import { useCallback, useContext } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ContextDashboard from "Context/Dashboard/ContextDashboard";

function Dashboard() {
	const { dataDashboards, deleteChart, readChart } =
		useContext(ContextDashboard);

	const adaptable = useCallback(() => {
		if (dataDashboards.length === 1) return 24;
		if (dataDashboards.length === 2) return 11;
		return 7;
	}, [dataDashboards.length]);
	return (
		<Row gutter={[12, 12]} justify='space-around' key='rowDash'>
			{dataDashboards.map((chart) => (
				<Col
					xs={24}
					sm={11}
					md={11}
					lg={adaptable()}
					style={{
						boxShadow: "10px 6px 20px 5px #8b8b8b, -6px 0px 20px #ffffff",
						background: "white",
					}}
					key={`${chart.settings.id}Col`}
				>
					<Row justify='space-between' key={`${chart.settings.id}Row`}>
						<h3>Titulo: {chart.settings.titleModal}</h3>
						<div>
							<Button
								key={`${chart.settings.id}editar`}
								style={{ backgroundColor: "#ffba00", marginRight: 5 }}
								type='primary'
								icon={<EditOutlined />}
								onClick={() => readChart(chart)}
							>
								Editar
							</Button>
							<Button
								key={`${chart.settings.id}borrar`}
								danger
								type='primary'
								icon={<DeleteOutlined />}
								onClick={() => deleteChart(chart.settings.id)}
							>
								Borrar
							</Button>
						</div>
					</Row>
					<h4 key={`${chart.settings.id}h4`} style={{ margin: 0 }}>
						Sector: {chart.settings.nameSector}
					</h4>
					{chart.settings.chartType === ChartEnum.TABLE ? (
						<ChartTable
							key={`${chart.settings.id}Table`}
							data={chart.data}
							settings={chart.settings}
						/>
					) : (
						<ChartGrafics
							key={`${chart.settings.id}Grafic`}
							data={chart.data}
							settings={chart.settings}
						/>
					)}
				</Col>
			))}
		</Row>
	);
}

export default Dashboard;
