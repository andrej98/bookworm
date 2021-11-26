import { createContext, FC, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { onAuthChanged } from '../utils/firebase';

type UserState = {
	user: User | undefined;
	loading: boolean;
};

const UserContext = createContext<UserState>(undefined as never);

export const UserProvider: FC = ({ children }) => {
	const [user, setUser] = useState<User>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthChanged(u => {
			setUser(u ?? undefined);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	return (
		<UserContext.Provider value={{ user, loading }}>
			{children}
		</UserContext.Provider>
	);
};

export const useLoggedInUser = () => {
	const { user, loading } = useContext(UserContext);
	return { user, loading };
};
