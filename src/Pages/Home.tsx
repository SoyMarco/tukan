import { useContext } from "react";
import { Affix, Button } from "antd";
import ChartEditorModal from "Components/Modal/ChartEditorModal";
import Dashboard from "Components/Dashboard/Dashboard";
import { AreaChartOutlined, AppstoreOutlined } from "@ant-design/icons";
import { ContextDashboard } from "Context/Dashboard/ContextDashboard";
import SaveStorageModal from "Components/Modal/SaveStorageModal";
import { downloadImage } from "Utils";

function Home() {
	const { openModal, isModalOpen, dataDashboards } =
		useContext(ContextDashboard);
	return (
		<div style={{ position: "relative" }}>
			<Affix offsetTop={0}>
				<Button
					type='primary'
					onClick={() => openModal()}
					icon={<AreaChartOutlined />}
					size='large'
					style={{ fontSize: "18px", fontWeight: "bold", marginBottom: 15 }}
				>
					Agregar gráfico
				</Button>
				{dataDashboards.length > 1 && (
					<Button
						style={{
							backgroundColor: "#006b76",
							position: "absolute",
							top: 0,
							right: 0,
						}}
						type='primary'
						size='large'
						icon={<AppstoreOutlined />}
						onClick={() => downloadImage("completeDashboard", "dashboard")}
					>
						Descar todo
					</Button>
				)}
			</Affix>
			<Dashboard />
			<SaveStorageModal></SaveStorageModal>
			{isModalOpen && <ChartEditorModal />}
		</div>
	);
}

export default Home;
