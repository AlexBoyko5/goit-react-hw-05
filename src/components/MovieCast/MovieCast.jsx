import styles from './MovieCast.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieCast() {
	const [cast, setCast] = useState([]);
	const { movieId } = useParams();
	useEffect(() => {
		const fetchMovieCast = async () => {
			try {
				const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
				const response = await axios.get(url);
				setCast(response.data.cast);
			} catch (error) {
				console.error('Error fetching movie cast:', error.message);
			}
		};
		fetchMovieCast();
	}, [movieId]);
	return (
		<div>
			<h2>Cast</h2>
			<ul className={styles.cast.list}>
				{cast.map((actor) => (
					<li key={actor.id}>{actor.name}</li>
				))}
			</ul>
		</div>
	);
}
export default MovieCast;
