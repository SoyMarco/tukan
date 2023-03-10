import { useState, useCallback } from "react";
import type { UseFormModalType } from "Types/Dashboard";

function useFormModal<T>(initialState: T): UseFormModalType<T> {
	const [formModal, setFormModal] = useState<T>(initialState);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	//UPDATE
	const updateSettingsModal = (value: Partial<T>) => {
		const updatedData = { ...formModal, ...value };
		setFormModal(updatedData);
	};
	//RESET
	const resetSettingsModal = useCallback(() => {
		const id = new Date().getTime().toString();
		setFormModal({ ...initialState, id });
	}, [initialState]);

	//OPEN
	const openModal = () => {
		setIsModalOpen(true);
	};
	//CLOSE
	const closeModal = useCallback(() => {
		resetSettingsModal();
		setIsModalOpen(false);
	}, [resetSettingsModal]);

	return {
		formModal,
		updateSettingsModal,
		openModal,
		closeModal,
		isModalOpen,
	};
}

export default useFormModal;
