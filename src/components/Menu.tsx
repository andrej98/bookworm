import { Button } from '@mui/material';
import { FC } from 'react';

type MenuItem = {
	// route: string;
	label: string;
};

type MenuProps = {
	mobile: boolean;
};

const menuItems: MenuItem[] = [
	{
		// route: '/',
		label: 'Books'
	},
	{
		// route: '/books-to-read',
		label: 'Books to read'
	},
	{
		// route: 'read-books',
		label: 'Read books'
	}
];

const Menu: FC<MenuProps> = props => (
	<>
		{menuItems.map((item, index) => (
			<Button key={index} color={props.mobile ? 'primary' : 'secondary'}>
				{item.label}
			</Button>
		))}
	</>
);

export default Menu;
