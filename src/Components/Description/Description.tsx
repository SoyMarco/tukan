import tukanPNG from "Assets/tukan.png";
import { Skeleton, Space } from "antd";
import { DotChartOutlined } from "@ant-design/icons";

function Description() {
	return (
		<div
			style={{
				height: "100vh",
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				textAlign: "center",
				backgroundColor: "#eceded",
			}}
		>
			<div>
				<img src={tukanPNG} alt='Tukan' style={{ width: 600 }} />
				<p>
					Bienvenido al sistema para visualizar tablas y graficas de la base de
					datos de Banxico.
				</p>
				<p> Sistema creado por Marco para Tukan.</p>
				<Skeleton active />
				<Space>
					<Skeleton.Node active>
						<DotChartOutlined style={{ fontSize: 40, color: "#bfbfbf" }} />
					</Skeleton.Node>
					<Skeleton.Image active />
				</Space>
			</div>
		</div>
	);
}

export default Description;
