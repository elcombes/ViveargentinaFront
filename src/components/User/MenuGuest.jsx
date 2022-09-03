import React, { Fragment } from 'react';
import Register from './Register';
import Login from './Login';



//componente Barra MEnu de Usuario - Ruta en App.js --> "/userguest"  
export default function MenuGuest() {
	
	return (	
		<Fragment>    
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav mr-auto">
                        <Register/>
                        <Login/>
						
                        <button><i class="bi bi-cart"></i></button>

						<li class="nav-item active">
							<a class="nav-link" href="#">MY TRIPS</a>
						</li>
					</ul>
				</div>
			</nav>
		</Fragment>
	)
}