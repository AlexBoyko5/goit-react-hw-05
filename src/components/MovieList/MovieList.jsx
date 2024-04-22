function MovieList({ movies }) {
	return (
		<div>
			<h2></h2>
			<ul>
				{movies.map((movie) => (
					<li key={movie.id}>{movie.title}</li>
				))}
			</ul>
		</div>
	);
}
export default MovieList;
