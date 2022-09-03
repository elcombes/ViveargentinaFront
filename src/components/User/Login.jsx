import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import FacebookLogin from 'react-facebook-login';
// import { useDispatch, useSelector } from "react-redux";

export default function Login() {

    const clientId = "1027358109012-bq2hsesgqbm1av81limdn7r7bf6qmpd3.apps.googleusercontent.com"

    useEffect(() => {
        const initClient = () => {
              gapi.client.init({
              clientId: clientId,
              scope: ''
            });
         };
         gapi.load('client:auth2', initClient);
     });

    const onSuccess = (res) => {
        console.log('success:', res);
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const responseFacebook = (response) => {
		console.log(response);
	}

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">

                    {/* Inicio boton para abrir el modal */}
                    <div>
                        <button 
                        type="button" 
                        className="btn btn-outline-secondary btn-lg" 
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal1"
                        style = {{textTransform:"uppercase", fontFamily: "Raleway", fontWeight: "500", color:" #C49D48"}}
                        >
                            Login <i class="bi bi-box-arrow-in-right"></i>
                        </button>
                    </div>
                    {/* Fin boton para abrir el modal */}
                    {/* Google login */}
                    <div>
                        
                    </div>
                    {/* Inicio modal */}
                    <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title w-100 font-weight-bold" id="exampleModalLabel">PLEASE LOGIN</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-body">

                                    {/* Inicio Form */}

                                    <Form as={Col} md="12" noValidate validated={validated} onSubmit={handleSubmit} >

                                        <Row className="mb-1">

                                            <Form.Group as={Col} md="12" controlId="formGroupEmail">

                                                <Form.Label><i class="bi bi-envelope-fill"></i> Email address</Form.Label>
                                                <Form.Control required type="email" placeholder="name@example.com" />

                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid email.
                                                </Form.Control.Feedback>

                                                <Form.Control.Feedback>
                                                    Looks good!
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-1">

                                            <Form.Group as={Col} md="12" controlId="formGroupPassword">

                                                <Form.Label htmlFor="inputPassword5"><i class="bi bi-key-fill"></i> Password</Form.Label>

                                                <Form.Control required type="password" id="inputPassword5" aria-describedby="passwordHelpBlock" />
                                                <Form.Text id="passwordHelpBlock" muted>
                                                    Your password must be 8-20 characters long, contain letters and numbers,
                                                    and must not contain spaces, special characters, or emoji.
                                                </Form.Text>
                                                <Form.Control.Feedback>
                                                    Looks good!
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                        </Row>

                                        <Row className="mb-3 mt-3">
                                            <Button type="submit"style={{fontSize: "2vh", fontFamily:"Raleway", backgroundColor: "#C49D48", borderColor: "#C49D48" }}>Login</Button>
                                        </Row>
                                        <div className="googleLog" style={{textAlign: "center", }}>

                                            <GoogleLogin
                                                clientId={clientId}
                                                buttonText="Sign in with Google"
                                                onSuccess={onSuccess}
                                                onFailure={onFailure}
                                                cookiePolicy={'single_host_origin'}
                                                isSignedIn={true}
                                            />
                                        </div>
                                    </Form>
                                    {/* Fin Form */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Fin modal */}
                </div>
            </div>
        </div>
    )
}