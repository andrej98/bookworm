import { Box } from '@mui/material';
import { Switch, Route } from 'react-router-dom';

import { useLoggedInUser } from '../hooks/useLoggedInUser';
import AllBooks from '../pages/AllBooks';
import BooksToRead from '../pages/BooksToRead';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import ReadBooks from '../pages/ReadBooks';
import WelcomePage from '../pages/WelcomePage';

const Routes = () => {
	const user = useLoggedInUser();
	return (
		<Box>
			{user ? (
				<Switch>
					<Route path="/" exact component={AllBooks} />
					<Route path="/books-to-read" exact component={BooksToRead} />
					<Route path="/read-books" exact component={ReadBooks} />
					<Route component={NotFound} />
				</Switch>
			) : (
				<Switch>
					<Route path="/" exact component={WelcomePage} />
					<Route path="/login" exact component={Login} />
					<Route component={NotFound} />
				</Switch>
			)}
		</Box>
	);
};
export default Routes;
