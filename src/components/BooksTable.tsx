import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { onSnapshot, deleteDoc } from 'firebase/firestore';
import { TableHead } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import { Book, booksCollection, booksDocument } from '../utils/firebase';
import { useLoggedInUser } from '../hooks/useLoggedInUser';
import useFilter from '../hooks/useFilter';

import BookDialog from './BookDialog';
import ConfirmDialog from './ConfirmDialog';
import Filter from './Filter';
import TablePaginationActions from './TablePagination';

type Column = {
	id: 'booktitle' | 'author' | 'category';
	label: string;
	minWidth?: number;
	align?: 'right';
};

const columns: readonly Column[] = [
	{ id: 'booktitle', label: 'Book Title' },
	{ id: 'author', label: 'Author', minWidth: 160, align: 'right' },
	{
		id: 'category',
		label: 'Category',
		minWidth: 160,
		align: 'right'
	}
];

type Props = {
	isRead?: boolean;
};

const BooksTable = ({ isRead }: Props) => {
	const { user } = useLoggedInUser();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [books, setBooks] = useState<Book[]>([]);
	const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
	const [selectedBookId, setSelectedBookId] = useState('');
	const filterProps = useFilter();

	useEffect(() => {
		const unsubscribe = onSnapshot(booksCollection, snapshot => {
			const allBooks = snapshot.docs.map(doc => ({
				...doc.data()
			}));
			let userBooks = allBooks.filter(userHasBook);
			if (isRead !== undefined) {
				userBooks = userBooks.filter(book => book.isRead === isRead);
			}
			setBooks(userBooks);
			filterBooks(userBooks as [Book]);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		filterBooks(books);
	}, [books]);

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredBooks.length) : 0;

	const handleChangePage = (
		_event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const userHasBook = (book: Book) => {
		if (!user?.email) {
			alert('The user must be signed in');
			return;
		}

		return book.user === user.email ? true : false;
	};

	const removeBook = () => {
		const bookRef = booksDocument(selectedBookId);
		deleteDoc(bookRef);
		setSelectedBookId('');
	};

	const filterBooks = (bookArray: Book[] = books) => {
		const searchTextFilter = filterProps.searchTextFilter;
		const categoryFilter = filterProps.categoryFilter;
		setFilteredBooks(
			bookArray.filter(book =>
				categoryFilter !== 'none'
					? book.title.toLowerCase().includes(searchTextFilter.toLowerCase()) &&
					  book.category.includes(categoryFilter)
					: book.title.toLowerCase().includes(searchTextFilter.toLowerCase()) &&
					  (isRead === undefined || book.isRead === isRead)
			)
		);
	};

	return (
		<>
			<Filter {...filterProps} filterBooks={filterBooks} />
			<TableContainer component={Paper}>
				<Table stickyHeader aria-label="sticky table" sx={{ minWidth: 500 }}>
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell
									key={column.id}
									style={{ width: column.minWidth, fontWeight: 'bold' }}
									align={column.align}
								>
									{column.label}
								</TableCell>
							))}
							<TableCell align="right" />
							<TableCell align="right" />
						</TableRow>
					</TableHead>
					<TableBody>
						{(rowsPerPage > 0
							? filteredBooks.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
							  )
							: filteredBooks
						).map(book => (
							<BookDialog key={book.id} isShowDialog book={book}>
								{open => (
									<TableRow key={book.id}>
										<TableCell
											sx={{ cursor: 'pointer' }}
											component="th"
											scope="row"
											onClick={open}
										>
											{book.title}
										</TableCell>
										<TableCell
											sx={{ cursor: 'pointer', width: 120 }}
											align="right"
											onClick={open}
										>
											{book.author}
										</TableCell>
										<TableCell
											sx={{ cursor: 'pointer', width: 120 }}
											align="right"
											onClick={open}
										>
											{book.category}
										</TableCell>
										<TableCell style={{ width: 20 }}>
											<BookDialog isEditDialog book={book}>
												{open => (
													<IconButton onClick={open}>
														<Edit />
													</IconButton>
												)}
											</BookDialog>
										</TableCell>
										<TableCell style={{ width: 20 }}>
											<ConfirmDialog
												bookTitle={book.title}
												onConfirm={() => removeBook()}
											>
												{open => (
													<IconButton
														color="error"
														onClick={() => {
															open();
															setSelectedBookId(book.id);
														}}
													>
														<Delete />
													</IconButton>
												)}
											</ConfirmDialog>
										</TableCell>
									</TableRow>
								)}
							</BookDialog>
						))}
						{emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
								colSpan={3}
								count={filteredBooks.length}
								rowsPerPage={rowsPerPage}
								page={page}
								SelectProps={{
									inputProps: {
										'aria-label': 'rows per page'
									},
									native: true
								}}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</>
	);
};

export default BooksTable;
