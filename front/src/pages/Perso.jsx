import React from 'react'
import './Perso.css'
import image_profil from './image/chat.jpg'
import image_fond from './image/music.jpg'
import Music from './Music.jsx'

function Perso(props) {

    let pseudo = "FLO";

    function updateInput(evt) {
        pseudo = evt.target.value;
    }

    return (
        <div id="page_profil">
            <div id="back_perso">
            <div id="top">
                <div id="top_mid">
                    <h3> My Profil </h3>
                </div>
            </div>
            <div id="info_perso">
                <div id="change_image_perso">
                    <img id="photo_perso" src={image_profil}/>
                    <button className="boutonChangePseudo"> Change Image </button>
                </div>
                <div id="change_pseudo_perso">
                    <h2 id="pseudo_perso" > {pseudo} </h2>
                    <input onChange= {updateInput} id="pseudo1" type="text" id="fname" name="fname"/>
                    <button className="boutonChangePseudo"> Change pseudo </button>
                </div>
            </div>
            </div>
            <div id="create_radio">    
                <div id="create_playlist">
                    <div id="name_create_playlist">
                        <h3 id="ccrrte"> Créer une playlist </h3>
                    </div>
                    <div id="my_create_playlist">
                        <div id="change_photo_name_playlist">
                            <div class="choice_name_playlist">
                            <img id="photo_playlist" src={image_profil}/>
                            <button className="boutonChangePseudo"> Choix image </button>
                            </div>
                            <div class="choice_name_playlist">
                                <h2 id="white"> Nom : </h2>
                                <input onChange= {updateInput} id="pseudo1" type="text" id="fname" name="fname"/>
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
                            <div class="choice_name_playlist">
                            <img id="photo_playlist" src={image_profil}/>
                            <button className="boutonChangePseudo"> Choix image </button>
                            </div>
                            <div class="choice_name_playlist">
                                <h2 id="white"> Nom : </h2>
                                <input onChange= {updateInput} id="pseudo1" type="text" id="fname" name="fname"/>
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

export default Perso
