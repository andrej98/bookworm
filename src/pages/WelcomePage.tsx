import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import Logo from '../images/logo.svg';

const WelcomePage = () => (
	<Box
		sx={{
			position: 'absolute',
			width: '100vw',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)',
			padding: '60px 20px 0 20px'
		}}
	>
		<Box
			sx={{
				display: 'flex',
				gap: 10,
				flexDirection: { xs: 'column', md: 'row' },
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Box>
				<Typography
					variant="h3"
					sx={{
						textAlign: 'center',
						fontWeight: 'bold',
						color: '#000'
					}}
				>
					Welcome to BookWorm.
				</Typography>
				<Typography
					variant="body1"
					sx={{
						textAlign: 'center',
						color: '#5f6368'
					}}
				>
					Your easy to use book tracking tool.
				</Typography>
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						alignItems: 'center',
						justifyContent: 'center',
						mt: 2
					}}
				>
					<Button size="large" component={Link} to="/login" variant="contained">
						Login
					</Button>
					<Button size="large" component={Link} to="/login" variant="outlined">
						Sign up
					</Button>
				</Box>
			</Box>
			<Box
				component="img"
				src={Logo}
				sx={{ width: { md: '25vw' }, maxWidth: '400px' }}
			/>
		</Box>
	</Box>
);
export default WelcomePage;
