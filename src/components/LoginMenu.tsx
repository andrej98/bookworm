import { Box, Button, IconButton } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useLoggedInUser } from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';

import UserDialog from './UserDialog';

const LoginMenu = () => {
	const { user } = useLoggedInUser();
	const { push } = useHistory();

	const logout = () => {
		signOut();
		push('/');
	};

	return (
		<div>
			{!user ? (
				<Button
					component={Link}
					to="/login"
					color="secondary"
					sx={{ textTransform: 'none', fontSize: '18px' }}
				>
					Login
				</Button>
			) : (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<div>
						<UserDialog>
							{open => (
								<IconButton color="secondary" onClick={open}>
									<AccountCircleIcon />
								</IconButton>
							)}
						</UserDialog>

						<Button color="secondary" onClick={logout}>
							<LogoutIcon />
						</Button>
					</div>
				</Box>
			)}
		</div>
	);
};
export default LoginMenu;
