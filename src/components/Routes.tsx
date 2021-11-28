import { Box } from '@mui/material';
import { Switch, Route } from 'react-router-dom';

import { useLoggedInUser } from '../hooks/useLoggedInUser';
import About from '../pages/About';
import AllBooks from '../pages/AllBooks';
import BooksToRead from '../pages/BooksToRead';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import ReadBooks from '../pages/ReadBooks';
import WelcomePage from '../pages/WelcomePage';

import Loading from './Loading';

const Routes = () => {
	const { user, loading } = useLoggedInUser();
	return (
		<Box>
			{user ? (
				<Switch>
					<Route path="/" exact component={AllBooks} />
					<Route path="/books-to-read" exact component={BooksToRead} />
					<Route path="/read-books" exact component={ReadBooks} />
					<Route path="/about" exact component={About} />
					<Route component={NotFound} />
				</Switch>
			) : (
				<Switch>
					<Route path="/" exact component={loading ? Loading : WelcomePage} />
					<Route path="/about" exact component={About} />
					<Route path="/login" exact component={Login} />
					<Route component={loading ? Loading : NotFound} />
				</Switch>
			)}
		</Box>
	);
};
export default Routes;
