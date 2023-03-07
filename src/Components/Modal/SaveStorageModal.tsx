import { Button, Modal } from "antd";
import useLocalStorash from "Hooks/useLocalStorash/useLocalStorash";

function SaveStorageModal() {
	const {
		setIsOpenModal,
		isOpenModal,
		deleteStoragereloadWindow,
		handleAcceptSaveStorage,
	} = useLocalStorash();

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

export default SaveStorageModal;
