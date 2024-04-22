// import reactLogo from '../../assets/react.svg';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import MovieSearch from '../MovieSearch/MovieSearch';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';

import './App.css';

//загрузка компонентов
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
	import('../../pages/MovieDetailsPage/MovieDetailsPage')
);
const NotFoundPage = lazy(() =>
	import('../../pages/NotFoundPage/NotFoundPage')
);
function App() {
	const apiKey = '8aba4e3419a44727b7eb66f35fce4fa2';
	return (
		<Router>
			{/* Router для маршрутизации*/}
			<Navigation />
			<MovieSearch />
			{/* Navigation для Router на всех стр*/}
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					{/* Suspense для заглушки*/}
					<Route exact path="/" element={<HomePage apiKey={apiKey} />} />
					<Route path="/movies" element={<MoviesPage apiKey={apiKey} />} />
					<Route
						path="/movies/:movieId"
						element={<MovieDetailsPage apiKey={apiKey} />}
					>
						<Route path="cast" element={<MovieCast />} />
						<Route path="reviews" element={<MovieReviews />} />
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Suspense>
		</Router>
	);
}

export default App;
