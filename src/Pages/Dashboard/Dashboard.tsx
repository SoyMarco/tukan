import StorageModal from "Components/Modal/Storage/StorageModal";
import FormModal from "Components/Modal/FormModal/FormModal";
import Dashboard from "Components/Dashboard/Dashboard";
import { BAffix } from "Components/AntD";

function Home() {
	return (
		<div>
			<BAffix />
			<Dashboard />
			<StorageModal />
			<FormModal />
		</div>
	);
}

export default Home;
