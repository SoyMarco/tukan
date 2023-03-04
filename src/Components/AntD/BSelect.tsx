import { Select } from "antd";

interface OptionType<T = string> {
	value: T;
	label: T;
}
interface BSelectProps<T = string> {
	placeholder: string;
	options?: OptionType[];
	onChange?: (value: T) => void;
	value?: T;
	loading?: boolean;
}

function BSelect<T = string>({
	placeholder,
	options,
	onChange,
	value,
	loading,
}: BSelectProps<T>) {
	return (
		<Select
			showSearch
			style={{ width: "100%" }}
			optionFilterProp='children'
			filterOption={(input, option) =>
				(option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
			}
			filterSort={(optionA, optionB) =>
				(optionA?.label ?? "")
					.toLowerCase()
					.localeCompare((optionB?.label ?? "").toLowerCase())
			}
			value={value}
			placeholder={placeholder}
			loading={loading}
			options={options}
			onChange={onChange}
		/>
	);
}

export default BSelect;
