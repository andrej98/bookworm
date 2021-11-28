import { Typography } from '@mui/material';

const WelcomePage = () => (
	<Typography
		variant="h4"
		sx={{
			position: 'absolute',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)',
			textAlign: 'center'
		}}
	>
		Welcome to BookWorm, log in!
	</Typography>
);
export default WelcomePage;
