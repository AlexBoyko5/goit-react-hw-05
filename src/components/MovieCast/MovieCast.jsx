import styles from './MovieCast.module.css';
function MovieCast({ cast }) {
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
