import { CssBaseline, ThemeProvider } from '@mui/material';

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
					<BooksTable />
				</div>
			</Layout>
		</ThemeProvider>
	</UserProvider>
);

export default App;
