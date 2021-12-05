import { useState } from 'react';

const useFilter = () => {
	const [searchTextFilter, setSearchTextFilter] = useState('');
	const [categoryFilter, setCategoryFilter] = useState('none');
	console.log(searchTextFilter);
	return {
		searchTextFilter,
		setSearchTextFilter,
		categoryFilter,
		setCategoryFilter
	};
};

export default useFilter;
