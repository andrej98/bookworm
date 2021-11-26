import { Switch, Route } from 'react-router-dom';

import { useLoggedInUser } from '../hooks/useLoggedInUser';
import AllBooks from '../pages/AllBooks';
import BooksToRead from '../pages/BooksToRead';
import Login from '../pages/Login';
import ReadBooks from '../pages/ReadBooks';

const Routes = () => {
	const user = useLoggedInUser();
	return (
		<Switch>
			{user ? (
				<>
					<Route path="/books" exact render={AllBooks} />
					<Route path="/books-to-read" exact component={BooksToRead} />
					<Route path="/read-books" exact component={ReadBooks} />
				</>
			) : (
				<Route path="/login" exact component={Login} />
			)}
			{/* <Route component={NotFound} /> */}
		</Switch>
	);
};
export default Routes;
