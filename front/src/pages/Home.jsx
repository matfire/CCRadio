import React from 'react'
import './Home.css'
import image_first from './musique/first.png'
import image_second from './musique/second.jpeg'
import image_third from './musique/third.jpeg'
import image_fourth from './musique/fourth.jpeg'
import Radio from './Radio.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';


import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';


import { Navbar,
        Nav, 
        NavDropdown, 
        Card,
        Image,
        FormControl,
        Button,
        InputGroup,
        CardGroup,
        ListGroup
    } from 'react-bootstrap';

const NavBarDrawer = status => {
    return (
        <Navbar id="top_mid">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title={status.current} id="collasible-nav-dropdown">
                        <NavDropdown.Item className="white" href="#profile">My Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#playlist">Playlist</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#new_playlist">New Playlist</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const CardMusic = () => {
    return (
        <MDBCol>
            <MDBCard style={{ width: "22rem" }}>
                <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
                <MDBCardBody>
                <MDBCardTitle>Card title</MDBCardTitle>
                <MDBCardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                </MDBCardText>
                <MDBBtn href="#">MDBBtn</MDBBtn>
                </MDBCardBody>
            </MDBCard>
    </MDBCol>
    )
}

function Home(props) {

    
    return (
        <div>
            <div id="top">
                <div id="top_mid">
                    <NavBarDrawer current={"Radio"}/>
                </div>
            </div>
            <div id="home_2">
                <CardMusic id="card_music"/>
            </div>
        </div>
    );
}

export default Home
