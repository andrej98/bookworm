import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

type MenuItem = {
	route: string;
	label: string;
};

type MenuProps = {
	mobile: boolean;
	userLoggedIn: boolean;
};

const loggedInMenuItems: MenuItem[] = [
	{
		route: '/',
		label: 'Books'
	},
	{
		route: '/books-to-read',
		label: 'Books to read'
	},
	{
		route: '/read-books',
		label: 'Read books'
	},
	{
		route: '/about',
		label: 'About'
	}
];

const notLoggedInMenuItems: MenuItem[] = [
	{
		route: '/about',
		label: 'About'
	}
];

const Menu = ({ mobile, userLoggedIn }: MenuProps) => (
	<>
		{userLoggedIn &&
			loggedInMenuItems.map((item, index) => (
				<Button
					key={index}
					component={Link}
					to={item.route}
					color={mobile ? 'primary' : 'secondary'}
				>
					{item.label}
				</Button>
			))}
		{!userLoggedIn &&
			notLoggedInMenuItems.map((item, index) => (
				<Button
					key={index}
					component={Link}
					to={item.route}
					color={mobile ? 'primary' : 'secondary'}
				>
					{item.label}
				</Button>
			))}
	</>
);

export default Menu;
