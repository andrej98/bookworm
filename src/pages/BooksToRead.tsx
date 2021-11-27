import BooksTable from '../components/BooksTable';
import BookPageHeader from '../components/BookPageHeader';

const BooksToRead = () => (
	<>
		<BookPageHeader title="Books to read" />
		<BooksTable isRead={false} />
	</>
);
export default BooksToRead;
