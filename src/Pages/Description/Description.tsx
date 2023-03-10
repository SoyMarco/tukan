import { DotChartOutlined } from "@ant-design/icons";
import tukanPNG from "Assets/tukan.png";
import { Skeleton, Space } from "antd";
import "./Description.css";

function Description() {
	return (
		<div className='description'>
			<div>
				<img src={tukanPNG} alt='Tukan' className='img_description' />
				<p>
					Bienvenido al sistema para visualizar tablas y graficas de la base de
					datos de Banxico.
				</p>
				<p> Sistema creado por Marco Antonio Salazar Ramirez para Tukan.</p>
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
