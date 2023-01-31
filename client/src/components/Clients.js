import { gql, useQuery } from '@apollo/client';
import React from 'react';

const GET_CLIENTS = gql`
{
clients{
	id
	name
	email
	phone
}
}
`;
export default function Clients() {
	const {loading,error,data} =  useQuery(GET_CLIENTS);
	if (loading) return 'Loading...';
if (error) return `Error! ${error.message}`;
return (
	<div>
		{data.clients.map((client) => (
		<li key={client.id} value={client.name}>
		{client.name}
		</li>
	))}
		
	
	</div>

)
}
