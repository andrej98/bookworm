import { FormHelperText } from '@mui/material';

type Props = {
	title: string;
};

const ErrorText = ({ title }: Props) => (
	<FormHelperText
		sx={{
			color: 'red'
		}}
	>
		{title}
	</FormHelperText>
);

export default ErrorText;
