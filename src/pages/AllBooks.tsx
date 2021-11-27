import { Button } from '@mui/material';

import BookDialog from '../components/BookDialog';
import BooksTable from '../components/BooksTable';

const AllBooks = () => (
	<>
		<h1>All books</h1>
		<BookDialog isAddBookDialog>
			{open => (
				<Button onClick={open} variant="contained">
					Add book
				</Button>
			)}
		</BookDialog>
		<BooksTable />
	</>
);
export default AllBooks;
