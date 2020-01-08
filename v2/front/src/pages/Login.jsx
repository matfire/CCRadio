import React, { useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBInput, MDBBtn } from 'mdbreact'
import {login} from '../client'
import { Link, useHistory } from 'react-router-dom'
function Login(props) {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let history = useHistory()
    return (
        <MDBContainer fluid>
            <MDBRow center >
                <MDBCol md="6" className="mt-5 pt-5">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardHeader className="form-header deep-purple">Sign In</MDBCardHeader>
                            <div className="grey-text">
                                <MDBInput label="email" icon="envelope" getValue={(value) => setEmail(value)} />
                                <MDBInput type="password" label="password" icon="lock" getValue={(value) => setPassword(value)} />
                            </div>
                            <div className="text-center mt-4">
                                <MDBBtn color="primary" onClick={() => {
                                    login(email, password).then(() => {history.push("/")})
                                }}>Sign In</MDBBtn> or <Link to="/register">Sign Up</Link>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Login
