import { useQuery } from '@apollo/client';
import React from 'react';
import ProjectRow from './ProjectRow';
import Spinner from './Spinner';
import { GET_PROJECTS } from './queries/ProjectQueries';
export default function Projects() {
	const {loading,error,data} =  useQuery( GET_PROJECTS );
	if( loading ) return <Spinner />;
	if( error ) return `Error! ${error.message}`;
return (
	<div>
		<table className="table">
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Description</th>
					<th scope="col">Action</th>
				</tr>
			</thead>
			<tbody>
					{data && data.projects.map((project) => (
					
					
						<ProjectRow key={project.id} project={project} />
					
				))}
			</tbody>
		</table>
	</div>

)
}
