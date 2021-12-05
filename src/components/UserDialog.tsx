import {
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReactNode, useState } from 'react';

import { useLoggedInUser } from '../hooks/useLoggedInUser';

type UserProps = {
	children: (open: () => void) => ReactNode;
};

const UserDialog = ({ children }: UserProps) => {
	const { user } = useLoggedInUser();
	const [open, setOpen] = useState(false);

	const closeDialog = () => {
		setOpen(false);
	};

	return (
		<>
			{children(() => setOpen(true))}
			<Dialog open={open} onClose={closeDialog} fullWidth>
				<DialogTitle
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						fontWeight: 'bold'
					}}
				>
					Currently logged in as
					<IconButton onClick={closeDialog}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 1,
						minWidth: 350
					}}
				>
					<Typography>{user?.email}</Typography>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default UserDialog;
