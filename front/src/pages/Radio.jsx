import React from 'react'
import './Home.css'

function Radio(props) {

    let image_first = props.photo;
    let name = props.name;
    
    return (
        <div class="awebradio">
            <img class="image_musique" src={image_first} width="400" height="250"/>
            <div class="inside_radio">
                <p class="name_musique"> {name} </p>
                <button class="favorite styled" type="button">
                    Play / Pauses
                </button>
            </div>
            
        </div>

    );
}

export default Radio
