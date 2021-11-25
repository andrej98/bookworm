import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Select,
	SelectChangeEvent,
	TextField,
	Typography
} from '@mui/material';
import { ReactNode, useState } from 'react';
import { setDoc } from 'firebase/firestore';

import useField from '../hooks/useField';
import { booksDocument } from '../utils/firebase';
import { useLoggedInUser } from '../hooks/useLoggedInUser';

import ErrorText from './ErrorText';

type Props = {
	children: (open: () => void) => ReactNode;
};

const options = [
	'Fantasy',
	'Historical',
	'Horror',
	'Action and Adventure',
	'Detective and Mystery',
	'Romance',
	'Biographies',
	'Cookbooks'
];

const BookDialog = ({ children }: Props) => {
	const user = useLoggedInUser();

	const [open, setOpen] = useState(false);

	const [title, titleProps] = useField('Title');
	const [author, authorProps] = useField('Author');
	const [year, yearProps] = useField('Year');
	const [category, setCategory] = useState('');
	const [description, descriptionProps] = useField('Description');

	const [titleError, setTitleError] = useState<boolean>(false);
	const [authorError, setAuthorError] = useState<boolean>(false);
	const [categoryError, setCategoryError] = useState<boolean>(false);

	const [submitError, setSubmitError] = useState<string>();

	const closeDialog = () => {
		setOpen(false);
		titleProps.onChange({ target: { value: '' } } as never);
		authorProps.onChange({ target: { value: '' } } as never);
		yearProps.onChange({ target: { value: '' } } as never);
		descriptionProps.onChange({ target: { value: '' } } as never);
		clearErrors();
	};

	const clearErrors = () => {
		setTitleError(false);
		setAuthorError(false);
		setCategoryError(false);
		setSubmitError(undefined);
	};

	const handleSubmit = async (isRead: boolean) => {
		// if (!user?.email) {
		// 	setSubmitError('You are not signed in');
		// 	return;
		// }

		let hasError = false;

		if (title.length === 0) {
			setTitleError(true);
			hasError = true;
		}

		if (author.length === 0) {
			setAuthorError(true);
			hasError = true;
		}

		if (category.length === 0 || category === '1') {
			setCategoryError(true);
			hasError = true;
		}

		if (hasError) {
			return;
		}

		try {
			await setDoc(booksDocument('m@m.com'), {
				user: 'm@m.com',
				title,
				author,
				year,
				category,
				description,
				isRead
			});
			closeDialog();
		} catch (err) {
			setSubmitError((err as { message?: string })?.message ?? 'unknown_error');
		}
	};

	const handleSelect = (event: SelectChangeEvent) => {
		setCategoryError(false);
		setCategory(event.target.value);
	};

	return (
		<>
			{children(() => setOpen(true))}
			<Dialog open={open} onClose={closeDialog}>
				<DialogTitle>Add book</DialogTitle>
				<DialogContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 1,
						minWidth: 500
					}}
				>
					<TextField
						label="Title *"
						fullWidth
						{...titleProps}
						onChangeCapture={() => setTitleError(false)}
						sx={{
							mt: 2
						}}
					/>
					{titleError && <ErrorText title="This field is required" />}
					<TextField
						label="Author *"
						fullWidth
						{...authorProps}
						onChangeCapture={() => setAuthorError(false)}
					/>
					{authorError && <ErrorText title="This field is required" />}
					<TextField label="Year" fullWidth {...yearProps} />
					<Select native defaultValue="none" onChange={handleSelect}>
						<option value="none" disabled>
							Select category *
						</option>
						{options.map((category, i) => (
							<option key={i} value={i}>
								{category}
							</option>
						))}
					</Select>
					{categoryError && (
						<ErrorText title="Please select a category first" />
					)}
					<TextField label="Description" fullWidth {...descriptionProps} />
				</DialogContent>
				<DialogActions>
					{submitError && (
						<Typography
							variant="subtitle2"
							align="left"
							color="error"
							paragraph
						>
							{submitError}
						</Typography>
					)}
					<Button
						onClick={closeDialog}
						sx={{
							mr: 2,
							ml: 2
						}}
					>
						Cancel
					</Button>
					<Button onClick={() => handleSubmit(false)} variant="contained">
						I want to read it
					</Button>
					<Button onClick={() => handleSubmit(true)} variant="contained">
						I already read it
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default BookDialog;
