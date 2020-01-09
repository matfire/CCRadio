import React, { useState, useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBNavbar, MDBNavbarBrand, MDBBtnFixed, MDBBtnFixedItem, MDBIcon, MDBCardBody, MDBCardUp, MDBAvatar, MDBBtn } from 'mdbreact'
import { getRadios, getImage } from '../client'
import { useHistory } from 'react-router-dom'


const Nav = ({radioName, radioSlogan, radioLogo}) => {
    const [toggled, setToggled] = useState(false)
    const history = useHistory()
    return (
        <MDBNavbar color="blue" dark expand="md">
            <MDBNavbarBrand>
    <strong className="modifiable" onClick={() => history.push("/")}>TekRadio {`${radioName ? `ft ${radioName}` : ""}${radioSlogan ? ` - ${radioSlogan}` : "" }`}</strong>
            </MDBNavbarBrand>
        </MDBNavbar>
    )
}

const ButtonPage = () => {
    const history = useHistory()
      return (
        <section>
          <MDBBtnFixed
            floating
            size="lg"
            color="red"
            icon="microphone"
            style={{ bottom: "45px", right: "24px" }}
            onClick = {() => {
                history.push(localStorage.getItem("jwt") ? "/radio/create" : "/login")
            }}
            >
          </MDBBtnFixed>
        </section>
      );
  }

const RadioCard = ({radioName, radioId, radioSlogan, radioLogo, radioMainColor}) => {
    const history = useHistory()

    return (
        <MDBCol md="4" key={radioId}>
            <MDBCard testimonial>
                    <MDBCardUp style={{backgroundColor:radioMainColor}} />
                    <MDBAvatar className="mx-auto white">
                        <img src={getImage(radioLogo)} style={{height:"120px"}}/>
                    </MDBAvatar>
                <MDBCardBody>
                    <h4 className="card-title mt-3">{radioName.split("_")[0]}</h4>
                    <hr />
                    <p>
                        {radioSlogan}
                    </p>
                    <hr />
                    <div className="text-center">
                        <MDBBtn color="amber" onClick={() => {
                            history.push(`/radio/${radioId}`)
                        }}>Listen Now</MDBBtn>
                    </div>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )
}

const Home = () => {
    const [radios, setRadios] = useState([])

    useEffect(() => {
        getRadios().then(rads => {
            setRadios(rads)
        })
    }, [])
    return (
        <div>
            <Nav />
        <MDBContainer fluid>
            <MDBRow className="mt-5 pt-5 mb-3">
                <MDBCol md="12">
                    <h3 className="text-center">Playing Radios</h3>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                {radios.map((r) => (
                    <RadioCard key={r._id} radioId={r._id} radioLogo={r.logo} radioMainColor={r.mainColor} radioName={r.name} radioSlogan={r.slogan} />
                ))}
            </MDBRow>
        </MDBContainer>
        <ButtonPage />
        </div>
    )
}

export default Home
export {Nav}