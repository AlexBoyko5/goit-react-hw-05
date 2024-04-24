import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';
import { API_READ_ACCESS_TOKEN } from '../../components/API/API';

const MovieDetailsPage = () => {
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
						Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
					},
				};
				const response = await axios.get(url, options);
				setMovieDetails(response.data);
			} catch (error) {
				setError(error.message);
			}
		};
		const fecthMovieReviews = async () => {
			try {
				const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;

				const options = {
					headers: {
						Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
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

				const options = {
					headers: {
						Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
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
	}, [movieId]);
	return (
		<div>
			{!movieDetails ? ( // обработка если данные еще загружаются
				<div>Loading...</div>
			) : (
				<div className={styles.container}>
					<button onClick={() => navigate(-1)} className={styles.button}>
						Go back
					</button>
					<h1>{movieDetails.title}</h1>
					<p>{movieDetails.overwiew}</p>
					<img
						src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
						alt={movieDetails.title}
					/>
					{error && <div>Error: {error}</div>}
					<MovieCast cast={cast} />
					<MovieReviews reviews={reviews} />
				</div>
			)}
		</div>
	);
};
export default MovieDetailsPage;
