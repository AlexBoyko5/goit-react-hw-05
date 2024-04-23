import styles from './MovieReviews.module.css';
const MovieReviews = ({ reviews }) => {
	return (
		<div>
			<h2>Reviews</h2>
			{reviews.length > 0 ? (
				<ul className={styles.reviews.list}>
					{reviews.map((review) => (
						<li key={review.id}>
							<h3>{review.author}</h3>
							<p>{review.content}</p>
						</li>
					))}
				</ul>
			) : (
				<p>No reviews for this movie.</p>
			)}
		</div>
	);
};
export default MovieReviews;
