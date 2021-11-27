import { Button, Typography, Box } from '@mui/material';

import BooksTable from '../components/BooksTable';
import BookPageHeader from '../components/BookPageHeader';

const ReadBooks = () => (
	<>
		<BookPageHeader title="Books you have already read" />
		<BooksTable isRead={false} />
	</>
);
export default ReadBooks;
