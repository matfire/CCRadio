import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import { Grid } from "@material-ui/core";
import './Perso.css';
import image_profil from './image/chat.jpg';
import image_fond from './image/music.jpg';
import Music from './Music.jsx';

const NavBarDrawer = status => {
    return (
        <Navbar id="top_mid">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title={status.current} id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#profile">My Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#playlist">Playlist</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#new_playlist">New Playlist</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const Profilecard = data => {
    return (
            <Card style={{ textAlign: "center" }} border="info" bg="dark">
                <Card.Img variant="top" src={data.img}/>
                <Card.Body id="change_pseudo_perso">
                    <div>
                    <Button className="boutonChangePseudo"> Change Image </Button>
                    <h2 id="pseudo_perso" > {data.pseudo} </h2>
                    <InputGroup className="mb-3">
                        <FormControl
                            id="fname"
                            placeholder="user's pseudo"
                            aria-label="user's pseudo"
                            aria-describedby="basic-addon2"
                            name="fname"
                            onChange={data.updateInput.bind(this)}
                            />
                            <Button
                                variant="outline-secondary"
                                onClick={data.print.bind(this)}>Enter</Button>
                    </InputGroup>
                    </div>
                </Card.Body>
            </Card>
    )
}

const MusicInfo = data => {
    return (
        <ListGroup.Item action variant={data.color}>
                <div>
            <Image id="music_photo" src={data.img} roundedCircle/>
            <h3>{data.title}</h3>
            <Button variant="outline-secondary"> - </Button>
            </div>
        </ListGroup.Item>
    )
}

const PlaylistCard = data => {
    return (
                <Card style={{ textAlign: "center" }} border="info" bg="dark" text="white">
                    <Card.Header>New Playlist</Card.Header>
                    <Card.Img variant="top" src={data.img}/>
                    <Card.Body>
                    <Button className="boutonChangePseudo"> Change Image </Button>
                    <InputGroup className="mb-3">
                        <FormControl
                            id="pname"
                            placeholder="Playlist name"
                            aria-label="Playlist name"
                            aria-describedby="basic-addon2"
                            name="pname"
                            />
                            <Button
                                variant="outline-secondary">Create</Button>
                    </InputGroup>
                    <Grid container spacing={3} direction="row" alignItems="baseline">
                    <Card bg="dark" text="white" border="success"
                        style={{ width: '40rem' }}>
                        <Card.Body>
                            <ListGroup>
                            <div>
                            <MusicInfo title="salut c'est cool" img={data.img} color="secondary"/>
                            <MusicInfo title="boom boom bomm" img={data.img} color="info"/>
                            <MusicInfo title="Last" img={data.img} color="secondary"/>
                            </div>
                            </ListGroup>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="outline-secondary">
                                Add Music
                            </Button>
                        </Card.Footer>
                    </Card>
                    </Grid>
                    </Card.Body>
                </Card>
    )
}

class Perso extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            pseudo: "FLO",
            current: "My Profile",
            printed_pseudo: "FLO"
        };
    }

    setPseudo(pseudo) {
        this.setState({
            pseudo: pseudo
        });
    }

    setPrintedPseudo() {
        this.setState({
            printed_pseudo: this.state.pseudo
        })
    }

    updateInput(evt) {
        this.setPseudo(evt.target.value);
    }

    render() {
    return (
        <div id="page_profil">
            <div id="back_perso">
                <div id="top">
                    <NavBarDrawer current={this.state.current}/>
                </div>
                <div>
                    <CardGroup>
                    <Grid container spacing={0} direction="row" alignItems="baseline" justify="center">
        <Grid item xs={6}>
                        <Profilecard img={image_profil}
                                    pseudo={this.state.printed_pseudo}
                                    updPseudo={this.state.pseudo}
                                    updateInput={this.updateInput.bind(this)}
                                    print={this.setPrintedPseudo.bind(this)}/>
                        <PlaylistCard img={image_profil}/>
                    </Grid>
                    </Grid>
                    </CardGroup>
                </div>
            </div>
            <div id="create_radio">    
                <div id="create_playlist">
                    <div id="name_create_playlist">
                        <h3 id="ccrrte"> Créer une playlist </h3>
                    </div>
                    <div id="my_create_playlist">
                        <div id="change_photo_name_playlist">
                            <div className="choice_name_playlist">
                            <img id="photo_playlist" src={image_profil}/>
                            <button className="boutonChangePseudo"> Choix image </button>
                            </div>
                            <div className="choice_name_playlist">
                                <h2 id="white"> Nom : </h2>
                                <input onChange= {this.updateInput.bind(this)} id="pseudo1" type="text" id="fname" name="fname"/>
                            </div>
                        </div>
                        <div id="choice_music">
                            <div id="name_choice_music">
                                <h2 id="h2namemusic"> Choix des musiques </h2>
                                <button className="boutonChangePseudo"> + </button>
                            </div>
                            <div id="list_music">
                                <Music name="salut c'est cool" photo={image_profil}/>
                                <Music name="boom boom bomm" photo={image_profil}/>
                                <Music name="Last" photo={image_profil}/>
                            </div>
                        </div>
                            <button className="boutonChangePseudo"> Valider </button>
                    </div>
                </div>
                <div id="your_playlist">
                    <div id="name_create_playlist">
                        <h3 id="ccrrte"> Lancer une playlist </h3>
                    </div>
                    <div id="my_create_playlist">
                        <div id="change_photo_name_playlist">
                            <div className="choice_name_playlist">
                            <img id="photo_playlist" src={image_profil}/>
                            <button className="boutonChangePseudo"> Choix image </button>
                            </div>
                            <div className="choice_name_playlist">
                                <h2 id="white"> Nom : </h2>
                                <input onChange= {this.updateInput.bind(this)} id="pseudo1" type="text" id="fname" name="fname"/>
                            </div>
                        </div>
                        <div id="choice_music">
                            <div id="name_choice_music">
                                <h2 id="h2namemusic"> Choix des musiques </h2>
                                <button className="boutonChangePseudo"> + </button>
                            </div>
                            <div id="list_music">
                                <Music name="salut c'est cool" photo={image_profil}/>
                                <Music name="boom boom bomm" photo={image_profil}/>
                                <Music name="Last" photo={image_profil}/>
                            </div>
                        </div>
                            <button className="boutonChangePseudo"> Valider </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
}

export default Perso
