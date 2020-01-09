import React, {useState, useEffect} from 'react'
import { Nav } from './Home'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBInput, MDBFileInput, MDBBtn } from 'mdbreact'
import ColorPicker from 'material-ui-color-picker'
import { createRadio } from '../client'
import { useHistory } from 'react-router-dom'

const RadioCreate = () => {
	const [mainColor, setmainColor] = useState("")
	const [secondaryColor, setSecondaryColor] = useState("")
	const [radioName, setRadioName] = useState("")
	const [slogan, setSlogan] = useState("")
	const [logo, setLogo] = useState(new File([], "test name"))
	const history = useHistory()

	useEffect(() => {
		document.body.style.backgroundColor = mainColor || "white"
	}, [mainColor])
	useEffect(() => {
		if (secondaryColor) {
			const sheet = new CSSStyleSheet()
			sheet.replaceSync(`.modifiable {color: ${secondaryColor};}`)
			document.adoptedStyleSheets = [sheet]
		}
	}, [secondaryColor])
	useEffect(() => {
		return prepareExit
	}, [])
	const prepareExit = () => {
		document.body.style.backgroundColor = "white"
		document.adoptedStyleSheets = []
	}
	return (
		<div>
			<Nav radioName={radioName} radioSlogan={slogan}/>
			<MDBContainer fluid className="mt-5 pt-5">
				<MDBRow center>
					<MDBCol md="6">
						<MDBCard>
							<MDBCardBody>
								<MDBCardHeader className="form-header deep-purple">Create your Radio</MDBCardHeader>
								<MDBInput label="Radio Name" className="modifiable" getValue={(value) => setRadioName(value)}/>
								<MDBInput label="Radio Slogan" className="modifiable" getValue={(value) => setSlogan(value)}/>
								<MDBFileInput textFieldTitle="Upload File" btnTitle="Upload Logo" getValue={(f) => setLogo(f[0])} />
								<p className="modifiable mt-3">Primary Color</p> <ColorPicker name="primary color" value={mainColor} onChange={(color) => setmainColor(color)}/>
								<p className="modifiable mt-3">Secondary Color</p> <ColorPicker name="secondary color" value={secondaryColor} onChange={(color) => setSecondaryColor(color)} />
								<div className="mt-3 text-center modifiable">
									<MDBBtn color="primary" onClick={() => {
										createRadio(radioName, slogan, logo, mainColor, secondaryColor).then((id) => {
											history.push(`/radio/${id}`)
										})
									}}>Create</MDBBtn>
								</div>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</div>
	)
}

export default RadioCreate