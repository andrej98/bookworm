import { Box, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const NotFound = () => (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			mt: '100px'
		}}
	>
		<WarningIcon sx={{ typography: 'h1' }} />
		<Typography variant="h2">Not found</Typography>
		<Typography>This page does not exist :(</Typography>
	</Box>
);

export default NotFound;
