import { useState } from "react";
import { Button } from "antd";
import BModal from "Components/Modal/BModal";
import Dashboard from "Components/Dashboard/Dashboard";

function Home() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	return (
		<>
			<Button type='primary' onClick={showModal}>
				Open Modal
			</Button>
			{<Dashboard />}

			{isModalOpen && <BModal setIsModalOpen={setIsModalOpen} />}
		</>
	);
}

export default Home;
