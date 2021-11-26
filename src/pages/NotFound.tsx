import { Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const NotFound = () => (
	<>
		<WarningIcon sx={{ typography: 'h1' }} />
		<Typography variant="h2">Not found</Typography>
		<Typography>This page does not exist :(</Typography>
	</>
);

export default NotFound;
