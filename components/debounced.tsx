import TextField from "@mui/material/TextField";
import React from "react";

type DebouncedInputProps = {
	value: string | number;
	// eslint-disable-next-line no-unused-vars
	onChange: (value: string | number) => void;
	// eslint-disable-next-line react/require-default-props
	debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

// A debounced input react component
export default function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: DebouncedInputProps) {
	const [value, setValue] = React.useState(initialValue);

	React.useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [debounce, onChange, value]);

	return (
		<TextField
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}
			value={value}
			onChange={e => setValue(e.target.value)}
			variant="standard"
		/>
	);
}
