import { useContext, useMemo } from "react";
import { AreaChartOutlined, AppstoreOutlined } from "@ant-design/icons";
import { ContextDashboard } from "Context/Dashboard/ContextDashboard";
import { Affix, Button, Row } from "antd";
import { downloadImage } from "Utils";

export function BAffix() {
	const { openModal, dataDashboards } = useContext(ContextDashboard);
	const numCharts = useMemo(() => dataDashboards.length, [dataDashboards]);

	return (
		<Affix offsetTop={0}>
			<Row justify='space-between' style={{ backgroundColor: "white" }}>
				<Button
					type='primary'
					onClick={() => openModal()}
					icon={<AreaChartOutlined />}
					size='large'
					style={{ fontSize: "18px", fontWeight: "bold" }}
				>
					{numCharts > 1 ? "Agregar" : "Agregar nueva gráfica"}
				</Button>
				{numCharts > 1 && (
					<Button
						style={{
							backgroundColor: "#006b76",
						}}
						type='primary'
						size='large'
						icon={<AppstoreOutlined />}
						onClick={() => downloadImage("completeDashboard", "dashboard")}
					>
						Descargar todo
					</Button>
				)}
			</Row>
		</Affix>
	);
}
