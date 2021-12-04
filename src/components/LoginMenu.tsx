import { Box, Button } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useLoggedInUser } from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';

const LoginMenu = () => {
	const { user } = useLoggedInUser();
	const { push } = useHistory();

	const logout = () => {
		signOut();
		push('/');
	};

	const showUserNameInfo = () => {
		alert(`You are currently logged in as: \n${user?.email}`);
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
						{/* {mobile ? <div /> : <Typography>{user.email}</Typography>} */}
						<Button color="secondary" onClick={showUserNameInfo}>
							<AccountCircleIcon />
						</Button>

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
