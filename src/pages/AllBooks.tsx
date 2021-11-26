import { Button } from '@mui/material';

import BookDialog from '../components/BookDialog';
import BooksTable from '../components/BooksTable';
import ChooseImage from '../components/ChooseImage';

const AllBooks = () => (
	<>
		<h1>All books</h1>
		<ChooseImage />
		<BookDialog isShowDialog>
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
