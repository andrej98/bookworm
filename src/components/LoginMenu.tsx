import { Button } from '@mui/material';

import { useLoggedInUser } from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';

const LoginMenu = () => {
	const user = useLoggedInUser();

	return (
		<div>
			{!user ? (
				<Button color="secondary">Login</Button>
			) : (
				<Button color="secondary" onClick={signOut}>
					Logout
				</Button>
			)}
		</div>
	);
};
export default LoginMenu;
