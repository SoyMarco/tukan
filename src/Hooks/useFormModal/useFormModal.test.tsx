import useFormModal from "./useFormModal";
import { renderHook, act } from "@testing-library/react-hooks";
import { ChartSettingsType, LanguageEnum } from "Types/Dashboard";
import { initialDataFormModal } from "Utils";

describe("UseFormModalType hook", () => {
	it("should update chart settings modal", () => {
		const { result } = renderHook(() =>
			useFormModal<ChartSettingsType>(initialDataFormModal)
		);

		act(() => {
			result.current.updateSettingsModal({
				titleModal: "New Title",
				language: LanguageEnum.ENGLISH,
			});
		});

		expect(result.current.formModal.titleModal).toEqual("New Title");
		expect(result.current.formModal.language).toEqual(LanguageEnum.ENGLISH);
	});

	it("should open and close modal", () => {
		const { result } = renderHook(() =>
			useFormModal<ChartSettingsType>(initialDataFormModal)
		);

		expect(result.current.isModalOpen).toBeFalsy();

		act(() => {
			result.current.openModal();
		});

		expect(result.current.isModalOpen).toBeTruthy();

		act(() => {
			result.current.closeModal();
		});

		expect(result.current.isModalOpen).toBeFalsy();
	});
});
