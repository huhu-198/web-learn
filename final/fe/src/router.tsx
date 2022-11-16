import { createHashRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import App from './pages/App';
import DefaultPage from './pages/DefaultPage';

import Detail from './components/Detail';
import ListContainer from './components/ListContainer';

const router = createHashRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <DefaultPage />,
		children: [
			{
				path: '/homepage',
				element: <HomePage />,
				children: [
					{
						path: '/homepage',
						element: <ListContainer />,
					},
					{
						path: '/homepage/detail',
						element: <Detail />,
					},
				],
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/',
				element: <DefaultPage />,
			},
		],
	},
]);

export default router;
