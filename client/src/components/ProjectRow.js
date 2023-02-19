import { useMutation } from '@apollo/client';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { DELETE_PROJECT } from './mutations/ProjectMutations.js';
import { GET_PROJECTS } from './queries/ProjectQueries.js';
export default function ProjectRow({project}) {

	const [deleteClient] = useMutation(DELETE_PROJECT, {
		variables: {id: project.id},
		refetchQueries: [{
			query: GET_PROJECTS
		}]
		// update(cache) {
		// 	const { clients } = cache.readQuery({ query: GET_CLIENTS });
		// 	cache.writeQuery({
		// 		query: GET_CLIENTS,
		// 		data: { clients: clients.filter((client) => client.id !== client.id) }
		// 	});
		// }
	});

	const handleDelete = () => {
		if (window.confirm('Are you sure you want to delete this client?')) {
			deleteClient();
		}
	}
return (
	
	<>
		<tr id={project.id}>
			<td>{project.name}</td>
			<td>{project.description}</td>
			<td>
				<button className="btn btn-danger btn-sm">
					<FaTrash onClick={handleDelete} />
				</button>
			</td>
		</tr>
	</>
)
}
