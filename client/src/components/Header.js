import React from 'react';

export default function Header() {
return (
	<div className="container">
		<nav className="navbar navbar-default">
			<div className="container-fluid">
				<div className="navbar-header">
					<a className="navbar-brand" href="/">Graph QL</a>
				</div>
				<ul className="nav navbar-nav">
					<li className="active"><a href="/">Home</a></li>
					<li><a href="#">Page 1</a></li>
					<li><a href="#">Page 2</a></li>
					<li><a href="#">Page 3</a></li>
				</ul>
			</div>
		</nav>
	</div>
);
}
