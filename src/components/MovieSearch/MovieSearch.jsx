import { useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const MovieSearch = () => {
	// формир 'состояния'
	const [query, setQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [error, setError] = useState(null);
	// функц поиска фильм
	const handleSearch = async () => {
		try {
			const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`;
			const options = {
				headers: {
					Authorization: 'Bearer 8aba4e3419a44727b7eb66f35fce4fa2',
				},
			};
			const respons = await axios.get(url, options);
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
