import {
	Button,
	IconButton,
	Paper,
	Select,
	SelectChangeEvent,
	TextField
} from '@mui/material';
import Search from '@material-ui/icons/Search';
import { Close } from '@mui/icons-material';
import { useEffect, useState } from 'react';

import { categories } from './BookDialog';

type FilterProps = {
	filterBooks: (searchQuery: string, filterCategory: string) => void;
};

const Filter = (props: FilterProps) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [filterCategory, setFilterCategory] = useState('none');

	useEffect(() => {
		props.filterBooks(searchQuery, filterCategory);
	}, [searchQuery, filterCategory]);

	const handleChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => setSearchQuery(e.target.value);

	const handleSelect = (event: SelectChangeEvent) => {
		const selectedIndex = event.target.value as string;
		setFilterCategory(selectedIndex);
	};

	const clearSearch = () => setSearchQuery('');

	const clearCategory = () => setFilterCategory('none');

	const clearFilter = () => {
		clearSearch();
		clearCategory();
	};

	return (
		<Paper
			sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between'
			}}
		>
			<TextField
				variant="outlined"
				label="Search"
				fullWidth
				value={searchQuery}
				onChange={handleChange}
				InputProps={{
					endAdornment: searchQuery ? (
						<IconButton onClick={clearSearch}>
							<Close />
						</IconButton>
					) : (
						<IconButton>
							<Search />
						</IconButton>
					)
				}}
			/>

			<Select native value={filterCategory} onChange={handleSelect}>
				<option value="none">All categories</option>
				{categories.map((category, i) => (
					<option key={i} value={category}>
						{category}
					</option>
				))}
			</Select>
			<Button variant="outlined" onClick={clearFilter}>
				Clear
			</Button>
		</Paper>
	);
};
export default Filter;
