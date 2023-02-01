import { useQuery } from '@apollo/client';
import React from 'react';
import ClientRow from './ClientRow';
import Spinner from './Spinner';
import { GET_CLIENTS } from './queries/ClientQueries.js';
export default function Clients() {
	const {loading,error,data} =  useQuery( GET_CLIENTS );
	if( loading ) return <Spinner />;
	if( error ) return `Error! ${error.message}`;
return (
	<div>
		<table className="table">
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Email</th>
					<th scope="col">Phone</th>
					<th scope="col">Action</th>
				</tr>
			</thead>
			<tbody>
					{data && data.clients.map((client) => (
					
					
						<ClientRow key={client.id} client={client} />
					
				))}
			</tbody>
		</table>
	</div>

)
}
