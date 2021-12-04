import {
	Button,
	IconButton,
	Paper,
	Select,
	SelectChangeEvent,
	TextField
} from '@mui/material';
import { Close, Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';

import { categories } from './BookDialog';

type FilterProps = {
	filterBooks: () => void;
};

const Filter = (props: FilterProps) => {
	const [searchTextFilter, setSearchTextFilter] = useState(
		localStorage.getItem('searchText') ?? ''
	);
	const [categoryFilter, setCategoryFilter] = useState(
		localStorage.getItem('category') ?? 'none'
	);

	useEffect(() => {
		props.filterBooks();
	}, [searchTextFilter, categoryFilter]);

	const handleSearchTextChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const searchText = e.target.value as string;
		localStorage.setItem('searchText', searchText);
		setSearchTextFilter(searchText);
	};
	const handleCategoryChange = (event: SelectChangeEvent) => {
		const selectedCategory = event.target.value as string;
		localStorage.setItem('category', selectedCategory);
		setCategoryFilter(selectedCategory);
	};

	const clearSearch = () => {
		localStorage.setItem('searchText', '');
		setSearchTextFilter('');
	};

	const clearCategory = () => {
		localStorage.setItem('category', 'none');
		setCategoryFilter('none');
	};

	const clearFilters = () => {
		clearSearch();
		clearCategory();
	};

	return (
		<Paper
			sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				mb: 2,
				mt: 2
			}}
		>
			<TextField
				variant="outlined"
				label="Search"
				fullWidth
				value={searchTextFilter}
				onChange={handleSearchTextChange}
				InputProps={{
					endAdornment: searchTextFilter ? (
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

			<Select native value={categoryFilter} onChange={handleCategoryChange}>
				<option value="none">All categories</option>
				{categories.map((category, i) => (
					<option key={i} value={category}>
						{category}
					</option>
				))}
			</Select>
			<Button variant="contained" onClick={clearFilters}>
				Clear
			</Button>
		</Paper>
	);
};
export default Filter;
