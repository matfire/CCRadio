import React from 'react'

function Music(props) {

    let image_profil = props.photo;
    let name = props.name;
    
    return (
        <div id="one_music">
            <img id="photo_music" src={image_profil}/>
            <h3 id="name_music"> {name} </h3>
            <h3 id="name_music">  </h3>
            <button className="boutonDeleteMusic"> - </button>
        </div>

    );
}

export default Music
