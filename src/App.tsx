import { Button, CssBaseline, ThemeProvider } from '@mui/material';

import BookDialog from './components/BookDialog';
import BooksTable from './components/BooksTable';
import ChooseImage from './components/ChooseImage';
import Layout from './components/Layout';
import { UserProvider } from './hooks/useLoggedInUser';
import theme from './utils/theme';

const App = () => (
	<UserProvider>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Layout>
				<div>
					<h1>BookWorm</h1>
					<ChooseImage />
					<BookDialog dialogTitle="Add book">
						{open => (
							<Button onClick={open} variant="contained">
								Add book
							</Button>
						)}
					</BookDialog>
					<BooksTable />
				</div>
			</Layout>
		</ThemeProvider>
	</UserProvider>
);

export default App;
