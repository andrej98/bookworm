import ChooseImage from './components/ChooseImage';
import { UserProvider } from './hooks/useLoggedInUser';

const App = () => (
	<UserProvider>
		<div>
			<h1>BookWorm</h1>
			<ChooseImage />
		</div>
	</UserProvider>
);

export default App;
