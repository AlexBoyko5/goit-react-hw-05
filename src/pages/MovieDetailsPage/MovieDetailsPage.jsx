import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import { useNavigate, useParams } from 'react-router-dom';

const MovieDetailsPage = ({ apiKey }) => {
	const [movieDetails, setMovieDetails] = useState({});
	const [cast, setCast] = useState([]);
	const [reviews, setReviews] = useState([]);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const { movieId } = useParams();
	useEffect(() => {
		const fetchMovieDetails = async () => {
			try {
				const url = `https://api.themoviedb.org/3/movie/${movieId}`;
				const options = {
					headers: {
						Authorization: 'Bearer api_read_access_token',
					},
				};
				// const params = { api_key: apiKey, language: 'en-US' };
				const response = await axios.get(url, options);
				setMovieDetails(response.data);
			} catch (error) {
				setError(error.message);
			}
		};
		const fecthMovieReviews = async () => {
			try {
				const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
				// const params = {
				// 	api_key: apiKey,
				// 	language: 'en-US',
				// 	page: 1,
				// };
				const options = {
					headers: {
						Authorization: 'Bearer api_read_access_token',
					},
				};
				const response = await axios.get(url, options);
				setReviews(response.data.results);
			} catch (error) {
				setError(error.message);
			}
		};
		const fecthMovieCast = async () => {
			try {
				const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
				// const params = {
				// 	api_key: apiKey,
				// 	language: 'en-US',
				// };
				const options = {
					headers: {
						Authorization: 'Bearer api_read_access_token',
					},
				};
				const response = await axios.get(url, options);
				setCast(response.data.cast);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchMovieDetails();
		fecthMovieCast();
		fecthMovieReviews();
	}, [movieId, apiKey]);
	return (
		<div>
			<button onClick={() => navigate(-1)}>Go back</button>
			<h1>{movieDetails.title}</h1>
			<p>{movieDetails.overwiew}</p>
			<img
				src="https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}"
				alt="{movieDetails.title}"
			/>
			{error && <div>Error: {error}</div>}
			<MovieCast cast={cast} />
			<MovieReviews reviews={reviews} />
		</div>
	);
};
export default MovieDetailsPage;
