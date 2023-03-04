import { Row, Col, Button } from "antd";
import { ChartEnum } from "Types/Dashboard";
import ChartGrafics from "./ChartGrafics";
import ChartTable from "./ChartTable";
import { useCallback, useContext } from "react";
import {
	DeleteOutlined,
	EditOutlined,
	DownloadOutlined,
} from "@ant-design/icons";
import ContextDashboard from "Context/Dashboard/ContextDashboard";
import { downloadImage } from "Utils";

function Dashboard() {
	const { dataDashboards, deleteChart, readChart } =
		useContext(ContextDashboard);

	const adaptable = useCallback(() => {
		if (dataDashboards.length === 1) return 24;
		return 11;
	}, [dataDashboards.length]);
	return (
		<Row
			gutter={[12, 12]}
			justify='space-around'
			key='rowDash'
			id='completeDashboard'
		>
			{dataDashboards.map((chart) => (
				<Col
					xs={24}
					sm={24}
					md={11}
					lg={adaptable()}
					style={{
						boxShadow: "10px 6px 20px 5px #8b8b8b, -6px 0px 20px #ffffff",
						background: "white",
					}}
					key={`${chart.settings.id}Col`}
				>
					<Row justify='end' key={`${chart.settings.id}Row`}>
						<Button
							key={`${chart.settings.id}borrar`}
							danger
							type='primary'
							icon={<DeleteOutlined />}
							onClick={() => deleteChart(chart.settings.id)}
						>
							Borrar
						</Button>
						<Button
							key={`${chart.settings.id}editar`}
							style={{ backgroundColor: "#ffba00", margin: " 0 5px" }}
							type='primary'
							icon={<EditOutlined />}
							onClick={() => readChart(chart)}
						>
							Editar
						</Button>
						<Button
							style={{
								backgroundColor: "#006b76",
							}}
							type='primary'
							icon={<DownloadOutlined />}
							onClick={() =>
								downloadImage(chart.settings.id, chart.settings.titleModal)
							}
						>
							Descargar
						</Button>
					</Row>
					<div id={chart.settings.id}>
						<h3 style={{ marginTop: 0 }}>
							Titulo: {chart.settings.titleModal}
						</h3>
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
					</div>
				</Col>
			))}
		</Row>
	);
}

export default Dashboard;
