import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { onSnapshot, deleteDoc } from 'firebase/firestore';
import { TableHead } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import { Book, booksCollection, booksDocument } from '../utils/firebase';
import { useLoggedInUser } from '../hooks/useLoggedInUser';

import BookDialog from './BookDialog';
import ConfirmDialog from './ConfirmDialog';

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

type TablePaginationActionsProps = {
	count: number;
	page: number;
	rowsPerPage: number;
	onPageChange: (
		event: React.MouseEvent<HTMLButtonElement>,
		newPage: number
	) => void;
};

const TablePaginationActions = (props: TablePaginationActionsProps) => {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
};

const BooksTable = () => {
	const user = useLoggedInUser();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [books, setBooks] = useState<Book[]>([]);
	const [selectedBookId, setSelectedBookId] = useState('');

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - books.length) : 0;

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
		// TODO: uncomment
		if (!user?.email) {
			// alert('The user must be signed in');
			// TODO: assertion error
			// return;
		}

		// return book.user === user.email ? true : false;

		return book.user === 'm@m.com' ? true : false;
	};

	const removeBook = () => {
		const bookRef = booksDocument(selectedBookId);
		deleteDoc(bookRef);
		setSelectedBookId('');
	};

	useEffect(() => {
		const unsubscribe = onSnapshot(booksCollection, snapshot => {
			const allBooks = snapshot.docs.map(doc => ({
				...doc.data()
			}));
			setBooks(allBooks.filter(userHasBook));
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
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
						? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: books
					).map(book => (
						<TableRow key={book.title}>
							<TableCell component="th" scope="row">
								{book.title}
							</TableCell>
							<TableCell style={{ width: 120 }} align="right">
								{book.author}
							</TableCell>
							<TableCell style={{ width: 120 }} align="right">
								{book.category}
							</TableCell>
							<TableCell style={{ width: 20 }}>
								<IconButton title="edit">
									<Edit />
								</IconButton>
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
							count={books.length}
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
	);
};

export default BooksTable;
