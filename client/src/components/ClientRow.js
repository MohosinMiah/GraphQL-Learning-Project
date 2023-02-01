import { useMutation } from '@apollo/client';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { DELETE_CLIENT } from './mutations/ClientMutations.js';
import { GET_CLIENTS } from './queries/ClientQueries.js';
export default function ClientRow({client}) {

	const [deleteClient] = useMutation(DELETE_CLIENT, {
		variables: {id: client.id},
		refetchQueries: [{
			query: GET_CLIENTS
		}]
	});

	const handleDelete = () => {
		if (window.confirm('Are you sure you want to delete this client?')) {
			deleteClient();
		}
	}
return (
	
	<>
		<tr id={client.id}>
			<td>{client.name}</td>
			<td>{client.email}</td>
			<td>{client.phone}</td>
			<td>
				<button className="btn btn-danger btn-sm">
					<FaTrash onClick={handleDelete} />
				</button>
			</td>
		</tr>
	</>
)
}
