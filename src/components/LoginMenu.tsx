import { Button, Typography } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

import { useLoggedInUser } from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';

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
				<Button color="secondary" onClick={logout}>
					<LogoutIcon />
				</Button>
			)}
		</div>
	);
};
export default LoginMenu;
