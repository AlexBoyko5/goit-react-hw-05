import reactLogo from '../../assets/react.svg';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

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
	return (
		<Router>
			{/* Router для маршрутизации*/}
			<Navigation />
			{/* Navigation для Router на всех стр*/}
			<Suspense fallback={<div>Loading...</div>}>
				{/* Suspense для заглушки*/}
				<Switch>
					{/* Switch для выбор только одного маршрут*/}
					<Route exact path="/" Component={HomePage} />
					{/* сам маршрут*/}
					<Route exact path="/movies" Component={MoviesPage} />
					<Route />
				</Switch>
			</Suspense>
		</Router>
	);
}

export default App;
