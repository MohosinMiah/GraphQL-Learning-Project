import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
{
	projects {
		id
		name
		description
		client{
			id
			name
		}
	}
}
`;

export { GET_PROJECTS };

