import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import AddClientModule from './AddClientModule';
import './App.css';
import Clients from './components/Clients';
import Header from './components/Header';
import Projects from './components/Projects';


const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				clients: {
					merge(existing, incoming) {
						return incoming;
					}
				},
				projects: {
					merge(existing, incoming) {
						return incoming;
					}
				}
			}
		}
	}

});
const client = new ApolloClient({
	uri: 'http://localhost:8000/graphql',
	cache: cache,
});

function App() {
  return (
	<ApolloProvider client={client}>
	<div className="container">
		<Header/>
		
		<div className="jumbotron text-center">
			<h1>Graph QL Learning</h1>
			<p>Graph QL is Interesting</p> 
		</div>
		<AddClientModule />
		<Clients />
		<div className="mt-10">
			<Projects />
		</div>
	</div>
	</ApolloProvider>
);
}

export default App;
