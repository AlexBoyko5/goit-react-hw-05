import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';

const MovieDetailsPage = ({ match, apiKey }) => {
	const [movieDetails, setMovieDetails] = useState({});
	const [cast, setCast] = useState([]);
	const [reviews, setReviews] = useState([]);
	const [error, setError] = useState(null);
	useEffect(() => {
		const fetchMovieDetails = async () => {
			try {
				const movieId = match.params.movieId;
				const url = `https://api.themoviedb.org/3/movie/${movieId}`;
				const params = { api_key: apiKey, language: 'en-US' };
				const response = await axios.get(url, { params });
				setMovieDetails(response.data);
			} catch (error) {
				setError(error.message);
			}
		};
		const fecthMovieReviews = async () => {
			try {
				const movieId = match.params.movieId;
				const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
				const params = {
					api_key: apiKey,
					language: 'en-US',
					page: 1,
				};
				const response = await axios.get(url, { params });
				setReviews(response.data.results);
			} catch (error) {
				setError(error.message);
			}
		};
		const fecthMovieCast = async () => {
			try {
				const movieId = match.params.movieId;
				const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
				const params = {
					api_key: apiKey,
					language: 'en-US',
				};
				const response = await axios.get(url, { params });
				setCast(response.data.cast);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchMovieDetails();
		fecthMovieCast();
		fecthMovieReviews();
	}, [match, apiKey]);
	return (
		<div>
			<h1>{movieDetails.title}</h1>
			<p>{movieDetails.overwiew}</p>
			{error && <div>Error: {error}</div>}
			<MovieCast cast={cast} />
			<MovieReviews reviews={reviews} />
		</div>
	);
};
export default MovieDetailsPage;
