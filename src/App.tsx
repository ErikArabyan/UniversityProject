import { Switch, Route, Router as WouterRouter } from 'wouter';
import { Layout } from '@/components/layout';

import Home from '@/pages/home';
import LibraryOverview from '@/pages/library-overview';
import Lesson from '@/pages/lesson';
import NotFound from '@/pages/not-found';

function Router() {
	return (
		<Layout>
			<Switch>
				<Route path='/' component={Home} />
				<Route path='/library/:id' component={LibraryOverview} />
				<Route path='/lesson/:libId/:lessonId' component={Lesson} />
				<Route component={NotFound} />
			</Switch>
		</Layout>
	);
}

function App() {
	return (
		<WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
			<Router />
		</WouterRouter>
	);
}

export default App;
