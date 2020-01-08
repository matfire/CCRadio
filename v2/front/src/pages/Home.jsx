import React, { useState, useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBNavbar, MDBNavbarBrand, MDBBtnFixed, MDBBtnFixedItem, MDBIcon } from 'mdbreact'
import { getRadios } from '../client'
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
                    <MDBCol md="4" key={r._id}>
                        <MDBCard>
<p>{r.name}</p>
                        </MDBCard>
                    </MDBCol>
                ))}
            </MDBRow>
        </MDBContainer>
        <ButtonPage />
        </div>
    )
}

export default Home
export {Nav}