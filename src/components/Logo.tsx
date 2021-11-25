import { Typography } from '@mui/material';

type LogoProps = {
	mobile: boolean;
};

const Logo = (props: LogoProps) => (
	<Typography sx={{ mr: props.mobile ? 0 : 3 }} variant="h5">
		BookWorm
	</Typography>
);
export default Logo;
