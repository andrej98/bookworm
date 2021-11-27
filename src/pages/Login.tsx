import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';

import Loading from '../components/Loading';
import useField from '../hooks/useField';
import { signIn, signUp } from '../utils/firebase';

const Login = () => {
	const { push } = useHistory();

	const [isSignUp, setSignUp] = useState(false);
	const [loading, setLoading] = useState(false);

	const [email, usernameProps] = useField('email', true);
	const [password, passwordProps] = useField('password', true);

	const [submitError, setSubmitError] = useState<string>();

	const handleSubmit = async (e: FormEvent) => {
		setLoading(true);
		e.preventDefault();
		try {
			isSignUp ? await signUp(email, password) : await signIn(email, password);
			push('/');
		} catch (err) {
			setSubmitError(
				(err as { message?: string })?.message ?? 'Unknown error occured.'
			);
			setLoading(false);
		}
	};

	return (
		<>
			<Paper
				component="form"
				onSubmit={handleSubmit}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					p: 4,
					gap: 2
				}}
			>
				<Typography variant="h4" component="h2" textAlign="center" mb={3}>
					Login
				</Typography>
				<TextField label="E-mail" {...usernameProps} type="email" />
				<TextField label="Password" {...passwordProps} type="password" />
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row-reverse',
						gap: 2,
						alignItems: 'center',
						alignSelf: 'flex-end',
						mt: 2
					}}
				>
					<Button
						type="submit"
						onClick={() => setSignUp(false)}
						variant="contained"
					>
						Sing in
					</Button>
					<Button
						type="submit"
						variant="outlined"
						onClick={() => setSignUp(true)}
					>
						Sign up
					</Button>
					{submitError && (
						<Typography
							variant="caption"
							textAlign="right"
							sx={{ color: 'error.main' }}
						>
							{submitError}
						</Typography>
					)}
				</Box>
			</Paper>
			{loading && <Loading />}
		</>
	);
};

export default Login;
