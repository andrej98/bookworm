import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

type LogoProps = {
	mobile: boolean;
};

const Logo = (props: LogoProps) => (
	<Typography
		component={Link}
		to="/"
		sx={{ mr: props.mobile ? -3 : 3, textDecoration: 'none', color: 'inherit' }}
		variant="h5"
	>
		BookWorm
	</Typography>
);
export default Logo;
