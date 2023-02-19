import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { ADD_CLIENT } from './components/mutations/ClientMutations';
import { GET_CLIENTS } from './components/queries/ClientQueries';

export default function AddClientModule() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

// add client mutation
	const [addClient] = useMutation(ADD_CLIENT, {
		variables: { name, email, phone },
		refetchQueries: [{ query: GET_CLIENTS }]
	});

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(name, email, phone);
		// add client mutation data and save client
		addClient(name, email, phone);

		// reset satate
		setName('');
		setEmail('');
		setPhone('');
	};

return (
	<>
		<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addClientModal">
		<div className="d-flex align-items-center justify-content-center">
			<FaUser className="mr-2" />
			<span> Add Client</span>
		</div>
		</button>

		<div className="modal fade" id="addClientModal"  role="dialog" aria-labelledby="addClientModalLabel" aria-hidden="true">
		<div className="modal-dialog" role="document">
			<div className="modal-content">
			<div className="modal-header">
				<h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
				<button type="button" className="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div className="modal-body">
				<div className="mb-3">
					<form>
						<div className="form-group">
							<label className="form-label">Name</label>
							<input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
						</div>

						<div className="form-group">
							<label className="form-label">Email</label>
							<input type="text" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
						</div>

						<div className="form-group">
							<label className="form-label">Phone</label>
							<input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Phone" />
						</div>
						<div className="form-group">
							<button type="submit" onClick={onSubmit} className="form-control" id="submit" placeholder="Submit" data-dismiss="modal" > Submit</button>
						</div>
					</form>
				</div>
			</div>
			</div>
		</div>
		</div>
	</>
)
}
