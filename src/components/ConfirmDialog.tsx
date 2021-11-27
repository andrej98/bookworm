import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReactNode, useState } from 'react';

type Props = {
	bookTitle: string;
	onConfirm: () => void;
	children: (open: () => void) => ReactNode;
};

const ConfirmDialog = ({ bookTitle, onConfirm, children }: Props) => {
	const [open, setOpen] = useState(false);

	const handleConfirm = () => {
		onConfirm();
	};

	return (
		<>
			{children(() => setOpen(true))}

			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						fontWeight: 'bold'
					}}
				>
					Delete book
					<IconButton onClick={() => setOpen(false)}>
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
					<Typography>{bookTitle}</Typography>
					<Typography>Do you really want to proceed?</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						fullWidth
						onClick={() => {
							handleConfirm();
							setOpen(false);
						}}
						variant="contained"
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ConfirmDialog;
