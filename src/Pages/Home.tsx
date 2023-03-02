import { useState } from "react";
import { Affix, Button } from "antd";
import BModal from "Components/Modal/BModal";
import Dashboard from "Components/Dashboard/Dashboard";
import useCharts from "Hooks/useCharts";
import { AreaChartOutlined } from "@ant-design/icons";
const icons = [<AreaChartOutlined />];

function Home() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const { dataCharts, addChart, removeChart } = useCharts();
	const showModal = () => {
		setIsModalOpen(true);
	};

	return (
		<>
			<Affix offsetTop={10}>
				<Button
					type='primary'
					onClick={showModal}
					icon={icons[0]}
					size='large'
					style={{ fontSize: "20px", fontWeight: "bold", margin: 15 }}
				>
					Agregar visualización +
				</Button>
			</Affix>
			{<Dashboard dataCharts={dataCharts} removeChart={removeChart} />}

			{isModalOpen && (
				<BModal setIsModalOpen={setIsModalOpen} addChart={addChart} />
			)}
		</>
	);
}

export default Home;
