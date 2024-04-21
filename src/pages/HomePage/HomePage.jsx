import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import axios from 'axios';

const HomePage = ({ apiKey }) => {
	const [trendingMovies, setTrendingMovies] = useState([]);
	const [error, setError] = useState(null);
	useEffect(() => {
		const fetchTrendingMovies = async () => {
			try {
				const url = 'https://api.themoviedb.org/3/trending/movie/day';
				const params = {
					api_key: apiKey,
					include_adult: false,
					language: 'en-US',
					page: 1,
				};
				const response = await axios.get(url, { params });
				setTrendingMovies(response.data.results);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchTrendingMovies();
	}, [apiKey]);
	return (
		<div>
			<h1>Trending Movies</h1>
			{error && <div>Error:{error}</div>}
			<MovieList movies={trendingMovies} />
		</div>
	);
};
export default HomePage;
