import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import MovieSearch from '../../components/MovieSearch/MovieSearch';

const MoviesPage = ({ apiKey }) => {
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState(null);
	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const url = `https://api.themoviedb.org/3/discover/movie`;
				const params = {
					api_key: apiKey,
					language: 'en-US',
					sort_by: 'popularity.desc',
					include_adult: false,
					page: 1,
				};
				const response = await axios.get(url, { params });
				setMovies(response.data.results);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchMovies();
	}, [apiKey]);
	return (
		<div>
			<h1>Movies</h1>
			{error && <div>Error: {error}</div>}
			<MovieSearch apiKey={apiKey} />
			<MovieList movies={movies} />
		</div>
	);
};
export default MoviesPage;
