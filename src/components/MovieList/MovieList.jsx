import styles from './MovieList.module.css';
function MovieList({ movies }) {
	return (
		<div className={styles.movielist}>
			<h2></h2>
			<ul className={styles.list}>
				{movies.map((movie) => (
					<li key={movie.id}>{movie.title}</li>
				))}
			</ul>
		</div>
	);
}
export default MovieList;
