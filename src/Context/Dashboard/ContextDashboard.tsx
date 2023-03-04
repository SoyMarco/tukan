import { createContext } from "react";
import { ContextDashboardType } from "Types/Dashboard";
import { initialDataDashboard } from "Utils";

export const ContextDashboard = createContext<ContextDashboardType>({
	dataDashboards: [],
	createChart: () => {},
	readChart: () => {},
	updateChart: () => {},
	deleteChart: () => {},
	settingsModal: initialDataDashboard,
	updateSettingsModal: () => {},
	isModalOpen: false,
	openModal: () => {},
	closeModal: () => {},
	createDashboard: () => {},
	////useLocalStorage
	// setIsOpenModal: () => {},
	// isOpenModal: false,
	// deleteStoragereloadWindow: () => {},
	// handleAcceptSaveStorage: () => {},
});

export default ContextDashboard;
