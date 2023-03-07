import SaveStorageModal from "Components/Modal/SaveStorageModal";
import ChartEditorModal from "Components/Modal/ChartEditorModal";
import Dashboard from "Components/Dashboard/Dashboard";
import { BAffix } from "Components/AntD";

function Home() {
	return (
		<div>
			<BAffix />
			<Dashboard />
			<SaveStorageModal />
			<ChartEditorModal />
		</div>
	);
}

export default Home;
