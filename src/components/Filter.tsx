import {
	Button,
	IconButton,
	Paper,
	Select,
	SelectChangeEvent,
	TextField
} from '@mui/material';
import { Close, Search } from '@mui/icons-material';
import { useEffect } from 'react';

import { categories } from './BookDialog';

type FilterProps = {
	filterBooks: () => void;
	searchTextFilter: string;
	setSearchTextFilter: React.Dispatch<React.SetStateAction<string>>;
	categoryFilter: string;
	setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
};

const Filter = (props: FilterProps) => {
	useEffect(() => {
		props.filterBooks();
	}, [props.searchTextFilter, props.categoryFilter]);

	const handleSearchTextChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const searchText = e.target.value as string;
		props.setSearchTextFilter(searchText);
	};
	const handleCategoryChange = (event: SelectChangeEvent) => {
		const selectedCategory = event.target.value as string;
		props.setCategoryFilter(selectedCategory);
	};

	const clearSearch = () => {
		props.setSearchTextFilter('');
	};

	const clearCategory = () => {
		props.setCategoryFilter('none');
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
				value={props.searchTextFilter}
				onChange={handleSearchTextChange}
				InputProps={{
					endAdornment: props.searchTextFilter ? (
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

			<Select
				native
				value={props.categoryFilter}
				onChange={handleCategoryChange}
			>
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
