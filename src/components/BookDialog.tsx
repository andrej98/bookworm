import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Select,
	SelectChangeEvent,
	TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReactNode, useState } from 'react';
import { setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import useField from '../hooks/useField';
import { Book, booksDocument } from '../utils/firebase';
import { useLoggedInUser } from '../hooks/useLoggedInUser';

import ErrorText from './ErrorText';

type Props = {
	book?: Book;
	isAddBookDialog?: boolean;
	isEditDialog?: boolean;
	isShowDialog?: boolean;
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

// TODO: figure out how to fill textfields and dropdown when edit dialog is shown
const BookDialog = ({
	book,
	isAddBookDialog,
	isEditDialog,
	isShowDialog,
	children
}: Props) => {
	const { user } = useLoggedInUser();

	const [open, setOpen] = useState(false);

	const [title, titleProps] = useField('Title');
	const [author, authorProps] = useField('Author');
	const [year, yearProps] = useField('Year');
	const [category, setCategory] = useState('');
	const [description, descriptionProps] = useField('Description');

	const [titleError, setTitleError] = useState<boolean>(false);
	const [authorError, setAuthorError] = useState<boolean>(false);
	const [categoryError, setCategoryError] = useState<boolean>(false);

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
	};

	const handleSubmit = async (isRead: boolean) => {
		if (!user?.email) {
			alert('You are not signed in');
			return;
		}

		// TODO year validation
		let hasError = false;

		if (title.length === 0) {
			setTitleError(true);
			hasError = true;
		}

		if (author.length === 0) {
			setAuthorError(true);
			hasError = true;
		}

		if (category.length === 0) {
			setCategoryError(true);
			hasError = true;
		}

		if (hasError) {
			return;
		}

		try {
			await setDoc(booksDocument(uuid()), {
				user: user?.email,
				title,
				author,
				year,
				category,
				description,
				isRead
			});
			closeDialog();
		} catch (err) {
			alert((err as { message?: string })?.message ?? 'unknown_error');
		}
	};

	const handleSelect = (event: SelectChangeEvent) => {
		setCategoryError(false);
		const selectedIndex = event.target.value as any;
		setCategory(options[selectedIndex]);
	};

	return (
		<>
			{children(() => setOpen(true))}
			<Dialog open={open} onClose={closeDialog}>
				<DialogTitle
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					{isAddBookDialog
						? 'Add books'
						: isShowDialog
						? 'Show book'
						: 'Edit book'}

					<IconButton onClick={closeDialog}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
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
						disabled={isShowDialog ?? false}
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
						disabled={isShowDialog ?? false}
						{...authorProps}
						onChangeCapture={() => setAuthorError(false)}
					/>
					{authorError && <ErrorText title="This field is required" />}
					<TextField
						label="Year"
						disabled={isShowDialog ?? false}
						fullWidth
						{...yearProps}
					/>
					<Select
						native
						defaultValue="none"
						disabled={isShowDialog ?? false}
						onChange={handleSelect}
					>
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
					<TextField
						label="Description"
						fullWidth
						disabled={isShowDialog ?? false}
						{...descriptionProps}
					/>
				</DialogContent>
				<DialogActions>
					{isAddBookDialog && (
						<Button
							fullWidth
							onClick={() => handleSubmit(false)}
							variant="contained"
						>
							I want to read it
						</Button>
					)}
					{isAddBookDialog && (
						<Button
							fullWidth
							onClick={() => handleSubmit(true)}
							variant="contained"
						>
							I already read it
						</Button>
					)}
					{isEditDialog && book !== undefined && (
						<Button
							fullWidth
							onClick={() => handleSubmit(book.isRead)}
							variant="contained"
						>
							Save
						</Button>
					)}
					{isEditDialog && book !== undefined && !book.isRead && (
						<Button
							fullWidth
							onClick={() => handleSubmit(true)}
							variant="contained"
						>
							Read book
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</>
	);
};

export default BookDialog;
