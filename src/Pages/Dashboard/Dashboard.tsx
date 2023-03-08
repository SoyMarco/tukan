import SaveStorageModal from "Components/Modal/SaveStorageModal";
import SettingsModal from "Components/Modal/SettingsModal";
import Dashboard from "Components/Dashboard/Dashboard";
import { BAffix } from "Components/AntD";

function Home() {
	return (
		<div>
			<BAffix />
			<Dashboard />
			<SaveStorageModal />
			<SettingsModal />
		</div>
	);
}

export default Home;
