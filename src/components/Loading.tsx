import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

const Loading = () => (
	<Box sx={{ width: '100%' }}>
		<CircularProgress sx={{ margin: '40vh auto', display: 'block' }} />
	</Box>
);

export default Loading;
