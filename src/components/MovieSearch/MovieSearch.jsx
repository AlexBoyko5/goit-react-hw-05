import { useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const MovieSearch = ({ apiKey }) => {
	// формир 'состояния'
	const [query, setQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [error, setError] = useState(null);
	// функц поиска фильм
	const handleSearch = async () => {
		try {
			const url = `https://api.themoviedb.org/3/search/movie`;
			const params = {
				api_key: apiKey,
				include_adult: false,
				language: 'en-US',
				page: 1,
				query: query,
			};
			const respons = await axios.get(url, { params });
			setSearchResults(respons.data.results);
		} catch (error) {
			setError(error.message);
		}
	};
	return (
		<div>
			<h1>Search movies</h1>
			<input
				type="text"
				value={query}
				onChange={(event) => setQuery(event.target.value)}
				placeholder="Enter movie title"
			/>
			<button onClick={handleSearch}>Search</button>
			{error && <div>Error:{error}</div>}
			<MovieList movies={searchResults} />
		</div>
	);
};
export default MovieSearch;
