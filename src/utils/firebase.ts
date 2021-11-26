import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged,
	User
} from 'firebase/auth';
import {
	collection,
	CollectionReference,
	doc,
	DocumentReference,
	getFirestore
} from 'firebase/firestore';

// Initialize Firebase
initializeApp({
	apiKey: 'AIzaSyBREugjFWHSILg7zjjMyoE-E5OIjNNvLG8',
	authDomain: 'bookworm-pv247.firebaseapp.com',
	projectId: 'bookworm-pv247',
	storageBucket: 'bookworm-pv247.appspot.com',
	messagingSenderId: '354624839838',
	appId: '1:354624839838:web:3a3b77e24585e2e8f65b8f'
});

//TODO: Add google auth
// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

// Firestore
const db = getFirestore();

// Reviews collection
export type Book = {
	user: string;
	title: string;
	author: string;
	year: string;
	category: string;
	description: string;
	isRead: boolean;
	//TODO: add image -> https://firebase.google.com/docs/storage/web/start
};

export const booksCollection = collection(
	db,
	'books'
) as CollectionReference<Book>;

export const booksDocument = (id: string) =>
	doc(db, 'books', id) as DocumentReference<Book>;
