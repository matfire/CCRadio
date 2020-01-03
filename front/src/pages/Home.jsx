import React from 'react'
import './Home.css'
import image_first from './musique/first.png'
import image_second from './musique/second.jpeg'
import image_third from './musique/third.jpeg'
import image_fourth from './musique/fourth.jpeg'
import Radio from './Radio.jsx'

function Home(props) {

    
    return (
        <div>
            <div id="top">
                <div id="top_mid">
                    <h3> My web radio </h3>
                </div>
            </div>
            <div id="home">
                <Radio photo={image_first} name="Dance monkey"/>
                <Radio photo={image_second} name="Salut c'est cool"/>
                <Radio photo={image_third} name="Phoenix"/>
                <Radio photo={image_fourth} name="Glory harmor"/>
            </div>
        </div>
    );
}

export default Home
