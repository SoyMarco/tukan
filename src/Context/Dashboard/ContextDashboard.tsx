import { createContext } from "react";
import { ChartSettingsType, ContextDashboardType } from "Types/Dashboard";
import { initialDataFormModal } from "Utils";

export const ContextDashboard = createContext<
	ContextDashboardType<ChartSettingsType>
>({
	dataDashboards: [],
	createChart: () => {},
	readChart: () => {},
	updateChart: () => {},
	deleteChart: () => {},
	formModal: initialDataFormModal,
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
