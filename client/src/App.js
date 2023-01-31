import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './App.css';
import Clients from './components/Clients';
import Header from './components/Header';

const client = new ApolloClient({
	uri: 'http://localhost:8000/graphql',
	cache: new InMemoryCache(),
});

function App() {
  return (
	<ApolloProvider client={client}>
	<div className="container">
		<Header/>
		
		<div className="jumbotron text-center">
			<h1>My First Bootstrap Page</h1>
			<p>Resize this responsive page to see the effect!</p> 
		</div>
		<Clients />
		
	</div>
	</ApolloProvider>
);
}

export default App;
