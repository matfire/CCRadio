import React, { useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBInput, MDBBtn } from 'mdbreact'
import {register} from '../client'
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
                            <MDBCardHeader className="form-header deep-purple">Sign Up</MDBCardHeader>
                            <div className="grey-text">
                                <MDBInput label="email" icon="envelope" getValue={(value) => setEmail(value)} />
                                <MDBInput type="password" label="password" icon="lock" getValue={(value) => setPassword(value)} />
                            </div>
                            <div className="text-center mt-4">
                                <MDBBtn color="primary" onClick={() => {
                                    register(email, password).then(() => {history.push("/")})
                                }}>Sign up</MDBBtn> or <Link to="/login">Sign In</Link>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Login
