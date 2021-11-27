import { Button, Typography, Box } from '@mui/material';

import BookDialog from '../components/BookDialog';
type Props = {
	title: string;
};
const BookPageHeader = ({ title }: Props) => (
	<Box sx={{ mb: 2, mt: 2 }}>
		<Typography
			variant="h4"
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				fontWeight: 'bold'
			}}
		>
			{title}{' '}
			<BookDialog isAddBookDialog>
				{open => (
					<Button onClick={open} variant="contained">
						Add book
					</Button>
				)}
			</BookDialog>
		</Typography>
	</Box>
);
export default BookPageHeader;
