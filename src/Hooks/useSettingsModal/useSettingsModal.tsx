import { useState, useCallback } from "react";
import type { ChartSettingsType, UseNewChart } from "Types/Dashboard";
import { initialDataDashboard } from "Utils";

function useSettingsModal(): UseNewChart {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const [settingsModal, setSettingsModal] =
		useState<ChartSettingsType>(initialDataDashboard);

	const updateSettingsModal = (value: Partial<ChartSettingsType>) => {
		const updatedData = { ...settingsModal, ...value };
		setSettingsModal(updatedData);
	};

	const resetSettingsModal = useCallback(() => {
		const id = new Date().getTime().toString();
		setSettingsModal({ ...initialDataDashboard, id });
	}, []);

	//Modal functions
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = useCallback(() => {
		resetSettingsModal();
		setIsModalOpen(false);
	}, [resetSettingsModal]);

	return {
		settingsModal,
		updateSettingsModal,
		openModal,
		closeModal,
		isModalOpen,
	};
}

export default useSettingsModal;
