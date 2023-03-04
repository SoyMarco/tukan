import { useContext } from "react";
import { Affix, Button } from "antd";
import ChartEditorModal from "Components/Modal/ChartEditorModal";
import Dashboard from "Components/Dashboard/Dashboard";
import { AreaChartOutlined } from "@ant-design/icons";
import { ContextDashboard } from "Context/Dashboard/ContextDashboard";
import SaveStorageModal from "Components/Modal/SaveStorageModal";

function Home() {
	const { openModal, isModalOpen } = useContext(ContextDashboard);

	return (
		<>
			<Affix offsetTop={10}>
				<Button
					type='primary'
					onClick={() => openModal()}
					icon={<AreaChartOutlined />}
					size='large'
					style={{ fontSize: "20px", fontWeight: "bold", margin: 15 }}
				>
					Agregar visualización +
				</Button>
			</Affix>
			<Dashboard />
			<SaveStorageModal></SaveStorageModal>
			{isModalOpen && <ChartEditorModal />}
		</>
	);
}

export default Home;
