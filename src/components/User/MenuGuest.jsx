import React, { Fragment } from 'react';
import Register from './Register';
import Login from './Login';



//componente Barra MEnu de Usuario - Ruta en App.js --> "/userguest"  
export default function MenuGuest() {
	
	return (	
		<Fragment>    
			<nav class="navbar navbar-expand-lg navbar-light" style={{margin:"0",padding:"0", fontSize:"2vh"}}>
				<div class="collapse navbar-collapse" id="navbarSupportedContent" >
					<ul class="navbar-nav mr-auto">
                        <Register/>
                        <Login/>
						
                        <button style={{backgroundColor:"transparent", borderColor:"#c49d48e3", borderRadius:"2vh"}}><i class="bi bi-cart"></i></button>

						<li class="nav-item active">
							<a class="nav-link" href="#" style={{borderColor:"#C49D48", color:"#c49d4877"}}>MY TRIPS</a>
						</li>
					</ul>
				</div>
			</nav>
		</Fragment>
	)
}