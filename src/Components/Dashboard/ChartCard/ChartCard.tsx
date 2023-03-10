import { useContext } from "react";
import ContextDashboard from "Context/Dashboard/ContextDashboard";
import ChartGrafics from "Components/Dashboard/Charts/ChartGrafics";
import ChartTable from "Components/Dashboard/Charts/ChartTable";
import { ChartEnum, ChartType } from "Types/Dashboard";
import { downloadImage } from "Utils";
import { Row, Button } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	DownloadOutlined,
} from "@ant-design/icons";
import "./ChartCard.css";

function ChartCard({ chart }: { chart: ChartType }) {
	const { deleteChart, readChart } = useContext(ContextDashboard);

	const { settings, data } = chart;
	const { id, titleModal, nameSector, chartType } = settings;

	return (
		<div className='div_ChartCard'>
			<Row justify='end'>
				<Button
					icon={<DeleteOutlined />}
					className='btn_delete'
					onClick={() => deleteChart(id)}
				>
					Borrar
				</Button>
				<Button
					icon={<EditOutlined />}
					className='btn_edit'
					onClick={() => readChart(chart)}
				>
					Editar
				</Button>
				<Button
					icon={<DownloadOutlined />}
					className='btn_dowload'
					onClick={() => downloadImage(`${id}content`, titleModal)}
				>
					Descargar
				</Button>
			</Row>
			<div id={`${id}content`}>
				<h3>Titulo: {titleModal}</h3>
				<h4>Sector: {nameSector}</h4>

				{chartType === ChartEnum.TABLE && (
					<ChartTable data={data} settings={settings} />
				)}
				{chartType === ChartEnum.GRAFIC && (
					<ChartGrafics data={data} settings={settings} />
				)}
			</div>
		</div>
	);
}

export default ChartCard;
