import useSettingsModal from "./useSettingsModal";
import { renderHook, act } from "@testing-library/react-hooks";
import { LanguageEnum } from "Types/Dashboard";

describe("useNewChart hook", () => {
	it("should update chart settings modal", () => {
		const { result } = renderHook(() => useSettingsModal());

		act(() => {
			result.current.updateSettingsModal({
				titleModal: "New Title",
				language: LanguageEnum.ENGLISH,
			});
		});

		expect(result.current.settingsModal.titleModal).toEqual("New Title");
		expect(result.current.settingsModal.language).toEqual(LanguageEnum.ENGLISH);
	});

	it("should open and close modal", () => {
		const { result } = renderHook(() => useSettingsModal());

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
