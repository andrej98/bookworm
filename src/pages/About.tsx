import { Box, Typography } from '@mui/material';

const About = () => (
	<Box sx={{ mb: 2, mt: 2 }}>
		<Typography
			variant="h4"
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				fontWeight: 'bold',
				mb: 2
			}}
		>
			About bookworm
		</Typography>
		<Typography
			sx={{
				fontWeight: 'bold',
				mb: 2
			}}
		>
			Do you have issues with keeping track of the books you have read or those
			you want to read? Then you have come to the right place!
		</Typography>
		<Typography
			sx={{
				mb: 2
			}}
			color="text.secondary"
		>
			Bookworm is a tool used for management of your books. Under your own user
			profile, you can add the book after filling in the book title, author and
			selecting the right category. Optionally, you may also add a brief
			description of the book. For instance, the description may include your
			own review of the book.
		</Typography>
		<Typography
			sx={{
				mb: 2
			}}
			color="text.secondary"
		>
			Bookworm allows you to change info of existing book, put the book to read
			to the read books category. You may also delete it if you no longer want
			to keep this book in your itinerary. When displaying the books, you may
			filter them either using the searchbar or the book category.
		</Typography>
		<Typography
			sx={{
				fontWeight: 'bold',
				mb: 2
			}}
		>
			Happy reading!
		</Typography>
	</Box>
);

export default About;
