import React from 'react'
import './Login.css'

function Register(props) {

    let pseudo = "";
    let mdp = "";

    function Connexion() {
    }

    function updateInput(evt) {
        pseudo = evt.target.value;
    }

    function updateInputMdp(evt) {
        mdp = evt.target.value;
    }

    
    return (
            <div className="myConnect">
                <h3> Veuillez vous inscrire </h3>

                <p> Pseudo </p>
                <input onChange= {updateInput} id="pseudo1" type="text" id="fname" name="fname"/>
                <p> Mot de passe </p>
                <input onChange= {updateInputMdp} id="mdp" type="text" id="fname" name="fname"/>

                <div className="thebuttons">
                    <button className="boutonConnect" onClick={Connexion}> Connexion </button>
                    <button id="createAccount" className="boutonConnect" > Create Account </button>
                </div>
        
            </div>
    );
}

export default Register
