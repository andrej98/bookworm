import { FC, useState } from 'react';
import {
	AppBar,
	Container,
	Toolbar,
	Box,
	IconButton,
	Drawer,
	Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

import { useLoggedInUser } from '../hooks/useLoggedInUser';

import Menu from './Menu';
import LoginMenu from './LoginMenu';
import Logo from './Logo';

const Layout: FC = ({ children }) => {
	const { user } = useLoggedInUser();
	const [openedMenu, setOpenedMenu] = useState(false);

	const toggleDrawer = (open: boolean) => setOpenedMenu(open);

	return (
		<>
			<AppBar position="fixed">
				<Container maxWidth="lg">
					<Toolbar
						disableGutters
						sx={{ gap: 2, display: { xs: 'none', sm: 'flex' } }}
					>
						<Logo mobile={false} />
						<Menu mobile={false} userLoggedIn={user !== undefined} />
						<Box sx={{ flexGrow: 1 }} />
						<LoginMenu />
					</Toolbar>
					<Toolbar
						sx={{
							display: {
								xs: 'flex',
								sm: 'none'
							},
							justifyContent: 'space-between'
						}}
					>
						{user && (
							<IconButton
								edge="start"
								color="inherit"
								aria-label="open menu"
								onClick={() => toggleDrawer(true)}
							>
								<MenuIcon />
							</IconButton>
						)}
						<Logo mobile />
						<Drawer
							anchor="top"
							variant="temporary"
							open={openedMenu}
							onClose={() => toggleDrawer(false)}
							onClick={() => toggleDrawer(false)}
						>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column'
								}}
							>
								<Menu mobile userLoggedIn={user !== undefined} />
							</Box>
						</Drawer>
						<LoginMenu />
					</Toolbar>
				</Container>
			</AppBar>

			<Container
				maxWidth="lg"
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					// justifyContent: 'center',
					// alignItems: 'center',
					pt: 8,
					gap: 2
				}}
			>
				{children}
			</Container>
		</>
	);
};
export default Layout;
