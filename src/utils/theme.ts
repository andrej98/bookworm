import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#5e00d9',
			dark: '#8c0048',
			contrastText: '#ffffff'
		},
		text: {
			primary: '#000000',
			secondary: '#5f6368'
		},
		secondary: {
			main: '#ffffff'
		},
		background: {
			default: '#f3f2f7',
			paper: '#ffffff'
		}
	}
});

export default theme;
