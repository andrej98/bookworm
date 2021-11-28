import { Button } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';

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
				<Button component={Link} to="/login" color="secondary">
					Login
				</Button>
			) : (
				<Button color="secondary" onClick={logout}>
					Logout
				</Button>
			)}
		</div>
	);
};
export default LoginMenu;
