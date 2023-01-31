const { projects, clients } = require('../sampleData.js');

// Mongose Models

const Client = require('../models/Client.js');
const Project = require('../models/Project.js');

var { GraphQLObjectType, GraphQLNonNull, GraphQLEnumType, GraphQLList, GraphQLID, GraphQLString, GraphQLSchema } = require( 'graphql' );

// Client Type
const ClientType = new GraphQLObjectType({
	name: 'Client',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone: { type: GraphQLString },
	})
});


// Project Type
const ProjectType = new GraphQLObjectType({
	name: 'Project',
	fields: () => ({
		id: { type: GraphQLID },
		// clientId: { type: GraphQLObjectType( ClientType ) },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		status: { type: GraphQLString },
		client: { 
			type: ClientType,
			resolve(parent,args)
			{
				return Client.findById( parent.clientId  );
				// return clients.filter(client => client.id == parent.clientId );
			}
		}
	})
});


const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: () => ({

		clients: {
			type: new GraphQLList( ClientType ),
			resolve( parent, args )
			{
				return Client.find();
			}
		},

		client: {
			type: ClientType,
			args: { id: { type: GraphQLID } },
			resolve( parent, args )
			{
				return Client.findById( args.id );
			}
		},


		projects: {
			type: new GraphQLList( ProjectType ),
			resolve( parent, args )
			{
				return Project.find();
			}
		},

		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve( parent, args )
			{
				return Project.findById( args.id );
			}
		},



	})
});


// Mutation

const Mutation = new GraphQLObjectType({
	name: 'mutation',
	fields: () =>({
		// Add Client
		addClient: {
			type: ClientType,
			args: {
				name: {type:  new GraphQLNonNull( GraphQLString )  },
				email: {type:  new GraphQLNonNull( GraphQLString ) },
				phone: {type:  new GraphQLNonNull( GraphQLString ) }
			},
			resolve( parent, args )
			{
				const client = new Client({
					name: args.name,
					email: args.email,
					phone: args.phone
				});
				return client.save();
			}
		},
		// Delete Client
		deleteClient: {
			type: ClientType,
			args: {
				id: { type: new GraphQLNonNull( GraphQLID ) }
			},
			resolve(parent,args)
			{
				return Client.findByIdAndDelete( args.id )
			}
		},


		// Add Project
		addProject: {
			type: ProjectType,
			args: {
				name: {type:  new GraphQLNonNull( GraphQLString )  },
				description: {type:  new GraphQLNonNull( GraphQLString ) },
				status: {
					type: new GraphQLEnumType({
						name: 'projectstatus',
						values: {
						  NEW: { value: 'Not Started' },
						  PROGRESS: { value: 'In Progress' },
						  COMPLETED: { value: 'Completed' },
						},
					  }),
					  defaultValue: 'Not Started'
				 },
				clientId: {type: new GraphQLNonNull( GraphQLID )}
			},
			resolve( parent, args )
			{
				const project = new Project({
					name: args.name,
					description: args.description,
					status: args.status,
					clientId: args.clientId
				});
				return project.save();
			}
		},


		// Delete Project
		deleteProject: {
			type: ProjectType,
			args: {
				id: { type: new GraphQLNonNull( GraphQLID ) }
			},
			resolve(parent,args)
			{
				return Project.findByIdAndDelete( args.id )
			}
		},


		// Update Project 
		updateProject: {
			type: ProjectType,
			args: {
				id: { type: GraphQLID  },
				name: { type:  GraphQLString   },
				description: {type:  GraphQLString  },
				status: {
					type: new GraphQLEnumType({
						name: 'projectstatusupdate',
						values: {
						  NEW: { value: 'Not Started' },
						  PROGRESS: { value: 'In Progress' },
						  COMPLETED: { value: 'Completed' },
						},
					  }),
				 },
			},
			resolve( parent, args )
			{
				return Project.findByIdAndUpdate(
					args.id,
					{
						$set: { 
							name: args.name,
							description: args.description,
							status: args.status,
							
						},
						
					},
					{ new: true }
				);
			}

		}

	})
});


module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})