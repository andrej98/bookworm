import { createContext, FC, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { onAuthChanged } from '../utils/firebase';

type UserState = User | undefined;

const UserContext = createContext<UserState>(undefined as never);

export const UserProvider: FC = ({ children }) => {
	const [user, setUser] = useState<User>();

	useEffect(() => {
		const unsubscribe = onAuthChanged(u => setUser(u ?? undefined));
		return unsubscribe;
	}, []);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useLoggedInUser = () => {
	const user = useContext(UserContext);
	return user;
};
