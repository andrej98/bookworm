import { UserProvider } from './hooks/useLoggedInUser';

const App = () => (
	<UserProvider>
		<div>
			<h1>BookWorm</h1>
		</div>
	</UserProvider>
);

export default App;
