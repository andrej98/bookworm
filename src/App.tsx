import { Button, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import BookDialog from './components/BookDialog';
import BooksTable from './components/BooksTable';
import ChooseImage from './components/ChooseImage';
import Layout from './components/Layout';
import Routes from './components/Routes';
import { UserProvider } from './hooks/useLoggedInUser';
import theme from './utils/theme';

const App = () => (
	<UserProvider>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<CssBaseline />
				<Layout>
					<Routes />
					<div>
						<h1>BookWorm</h1>
						<ChooseImage />
						<BookDialog isShowDialog>
							{open => (
								<Button onClick={open} variant="contained">
									Add book
								</Button>
							)}
						</BookDialog>
						<BooksTable />
					</div>
				</Layout>
			</BrowserRouter>
		</ThemeProvider>
	</UserProvider>
);

export default App;
