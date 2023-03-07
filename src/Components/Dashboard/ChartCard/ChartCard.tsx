import { useContext } from "react";
import ContextDashboard from "Context/Dashboard/ContextDashboard";
import ChartGrafics from "Components/Dashboard/ChartGrafics";
import ChartTable from "Components/Dashboard/ChartTable";
import { ChartEnum } from "Types/Dashboard";
import { downloadImage } from "Utils";
import { Row, Button } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	DownloadOutlined,
} from "@ant-design/icons";
import "./ChartCard.css";

function ChartCard({ chart }: { chart: any }) {
	const { settings, data } = chart;
	const { id, titleModal, nameSector, chartType } = settings;
	const { deleteChart, readChart } = useContext(ContextDashboard);

	return (
		<div className='div_ChartCard'>
			<Row justify='end' key={`${id}Row`}>
				<Button
					key={`${id}borrar`}
					icon={<DeleteOutlined />}
					type='primary'
					danger
					onClick={() => deleteChart(id)}
				>
					Borrar
				</Button>
				<Button
					key={`${id}editar`}
					style={{ backgroundColor: "#ffba00", margin: " 0 5px" }}
					icon={<EditOutlined />}
					type='primary'
					onClick={() => readChart(chart)}
				>
					Editar
				</Button>
				<Button
					style={{
						backgroundColor: "#006b76",
					}}
					icon={<DownloadOutlined />}
					type='primary'
					onClick={() => downloadImage(`${id}content`, titleModal)}
				>
					Descargar
				</Button>
			</Row>
			<div id={`${id}content`}>
				<h3 style={{ marginTop: 0 }}>Titulo: {titleModal}</h3>
				<h4 key={`${id}h4`} style={{ margin: 0 }}>
					Sector: {nameSector}
				</h4>
				{chartType === ChartEnum.TABLE && (
					<ChartTable key={`${id}Table`} data={data} settings={settings} />
				)}
				{chartType === ChartEnum.GRAFIC && (
					<ChartGrafics key={`${id}Grafic`} data={data} settings={settings} />
				)}
			</div>
		</div>
	);
}

export default ChartCard;
