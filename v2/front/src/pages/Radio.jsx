import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBSpinner, MDBIcon, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBSelect, MDBInput } from 'mdbreact'
import { Nav } from './Home'
import { getRadio, getImage, getSongs, createPlaylist, getCurrentRadioSongs, getAudioUrl, playRadio } from '../client'
import AudioSpectrum from 'react-audio-spectrum'
import Plyr from 'plyr';

const PlaylistModal = ({ isOpen, toggle, radioId, updateRadio }) => {
    const [name, setName] = useState("")
    const [selectedSongs, setSelectedSongs] = useState([])
    const [songs, setSongs] = useState([])

    useEffect(() => {
        if (songs.length === 0)
            getSongs().then((s) => setSongs(s.map((s) => ({ text: s, value: s }))))
    }, [songs])

    return (
        <MDBModal isOpen={isOpen} toggle={() => toggle()}>
            <MDBModalHeader toggle={() => toggle()}>Playlist Creator</MDBModalHeader>
            <MDBModalBody>
                <MDBInput getValue={(value) => setName(value)} label="Playlist name" />
                <MDBSelect getValue={(value) => setSelectedSongs(value)} label="Select your music" multiple search selectAll options={songs} />
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="danger" onClick={() => {
                    setSelectedSongs([])
                    getSongs().then((s) => setSongs(s.map((s) => ({ text: s, value: s }))))
                    setName("")
                    toggle()
                }}>Cancel</MDBBtn>
                <MDBBtn color="primary" onClick={() => {
                    createPlaylist(name, selectedSongs, radioId).then(() => {
                        updateRadio()
                        toggle()
                    })
                }}>Submit</MDBBtn>
            </MDBModalFooter>
        </MDBModal>
    )
}


const Radio = (props) => {

    const { id } = useParams()
    const [radio, setRadio] = useState({})
    const [loading, setLoading] = useState(true)
    const [playlistModalOpen, setPlaylistModal] = useState(false)
    const user = JSON.parse(localStorage.getItem("user"))
    const player = useRef()
    useEffect(() => {

        setNewRadio()
        new Plyr(player.current)
        return prepareExit
    }, [id])
    const prepareExit = () => {
        document.body.style.backgroundColor = "white"
        document.adoptedStyleSheets = []
    }
    const setNewRadio = () => {
        getRadio(id).then((radio) => {
            setLoading(true)
            setRadio(radio)
            document.body.style.backgroundColor = radio.mainColor
            const sheet = new CSSStyleSheet()
            sheet.replaceSync(`.modifiable {color: ${radio.secondaryColor};}`)
            document.adoptedStyleSheets = [sheet]
            setLoading(false)
        })
    }
    if (loading) {
        return (<MDBContainer className="mt-5 pt-5">
            <MDBRow center>
                <MDBSpinner big crazy />
            </MDBRow>
        </MDBContainer>)
    }
    return (
        <div>
            <Nav radioName={radio.name} radioSlogan={radio.slogan} />
            <MDBContainer fluid className="mt-5 pt-5">
                <PlaylistModal isOpen={playlistModalOpen} radioId={radio._id} updateRadio={() => setNewRadio()} toggle={() => setPlaylistModal(!playlistModalOpen)} />
                <MDBRow center>
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardHeader className="form-header deep-purple">{radio.name}{user && radio.user._id === user._id && <div>
                                    <MDBIcon className="ml-5 mr-5" icon="cog" size="2x" />
                                    <MDBIcon className="ml-5 mr-5" icon="music" size="2x" onClick={() => {
                                        setPlaylistModal(!playlistModalOpen)
                                    }} />
                                </div>
                                }</MDBCardHeader>
                                <div className="grey-text">
                                    <div className="text-center"><p className="modifiable">{radio.slogan}</p></div>
                                    <MDBRow center>
                                        <img className="img-fluid" style={{height:"150px"}} src={getImage(radio.logo.split(".").pop())} alt={radio.name} />
                                    </MDBRow>
                                    <hr />
                                    <div className="text-center">
                                        <h3>Currently Playing</h3>
                                    </div>
                                    {radio.currentPlaylist && radio.currentPlaylist.songs.length > 0 ?
                                        <div className="text-center">
                                            {user && radio.user._id === user._id && <MDBRow center>
                                                    <MDBCol md="6">
                                                        <MDBBtn color="amber" onClick={() => playRadio(radio.currentPlaylist._id, radio._id)} >Launch</MDBBtn>
                                                    </MDBCol>
                                                </MDBRow>}
                                            <MDBRow>
                                                <MDBCol md="12">
                                                    <AudioSpectrum id="audio-viz"
                                                        audioId={"audio-source"}
                                                        capColor={radio.mainColor}
                                                        capHeight={2}
                                                        meterWidth={2}
                                                        meterCount={512}
                                                    />
                                                </MDBCol>
                                                <MDBCol md="12">
                                                    <audio ref={player} id="audio-source" controls crossOrigin="anonymous" autoPlay>
                                                        <source src={getAudioUrl(radio._id)} type="audio/mp3" crossOrigin="anonymous"/>
                                                    </audio>
                                                </MDBCol>
                                            </MDBRow>

                                        </div>
                                        : <div className="text-center">
                                            <p>No playlist is currently set</p>
                                        </div>}
                                </div>
                                <hr />
                                <div className="mt-3 text-center">
                                    <p className="modifiable">By {radio.user.email}</p>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default Radio
