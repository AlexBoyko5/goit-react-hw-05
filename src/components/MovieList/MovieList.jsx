import styles from './MovieList.module.css';
import { Link } from 'react-router-dom';
function MovieList({ movies }) {
	return (
		<div className={styles.movielist}>
			<h2></h2>
			<ul className={styles.list}>
				{movies.map((movie) => (
					<li key={movie.id}>
						<Link to={`/movies/${movie.id}`}>{movie.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
export default MovieList;
