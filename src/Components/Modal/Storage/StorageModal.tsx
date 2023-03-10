import { Button, Modal } from "antd";
import useControllerStorage from "Components/Modal/Storage/useControllerStorage";

function StorageModal() {
	const {
		deleteStoragereloadWindow,
		handleAcceptSaveStorage,
		setIsOpenModal,
		isOpenModal,
	} = useControllerStorage();

	return (
		<Modal
			open={isOpenModal}
			onCancel={() => setIsOpenModal(false)}
			footer={[
				<Button
					key='back'
					type='primary'
					ghost
					onClick={() => setIsOpenModal(false)}
				>
					Cancelar
				</Button>,
				<Button
					key='btnDelete'
					danger
					onClick={() => deleteStoragereloadWindow()}
				>
					No
				</Button>,
				<Button
					key='submit'
					type='primary'
					onClick={() => handleAcceptSaveStorage()}
				>
					Sí
				</Button>,
			]}
		>
			<h2>¿Desea mantener el panel para la próxima vez?</h2>
		</Modal>
	);
}

export default StorageModal;
