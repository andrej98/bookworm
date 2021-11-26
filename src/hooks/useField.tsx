import { ChangeEvent, useCallback, useState } from 'react';

const useField = (id: string, inputValue = '') => {
	const [value, setValue] = useState(inputValue);
	const [touched, setTouched] = useState(false);

	return [
		// Current value for convenient access
		value,
		// Props for the TextField
		{
			id,
			value,
			onChange: useCallback(
				(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
					setValue(e.target.value),
				[]
			),
			onBlur: useCallback(() => setTouched(true), [])
		}
	] as const;
};

export default useField;
