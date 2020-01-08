import axios from 'axios'

const API_URL = "http://localhost:4000"

/**
 * 
 * @param {String} email 
 * @param {String} password 
 */
const register = async(email, password) => {
	let res = await axios.post(`${API_URL}/register`, {email, password})
	if (res.status < 400) {
		let {token, user} = res.data
		localStorage.setItem("jwt", token)
		localStorage.setItem("user", JSON.stringify(user))
	} else {
		throw EvalError("Authentication Failed")
	}
}

const login = async(email, password) => {
	let res = await axios.post(`${API_URL}/login`, {email, password})

	if (res.status < 400) {
		let {token, user} = res.data
		localStorage.setItem("jwt", token)
		localStorage.setItem("user", JSON.stringify(user))
	} else {
		throw EvalError("Authentication Failed")
	}
}

/**
 * @returns {[String]} - radio list
 */
const getRadios = async() => {
	let res = await axios.get(`${API_URL}/radio/current`)
	if (res.status < 400) {
		return res.data.radios
	} else {
		throw EvalError("Cannot get radios")
	}
}

/**
 * 
 * @param {String} id 
 */
const getRadio = async(id) => {
	let res = await axios.get(`${API_URL}/radio/${id}`)

	if (res.status < 400) {
		return res.data.radio
	}
}

/**
 * 
 * @param {String} radioName 
 * @param {String} slogan 
 * @param {File} logo 
 * @param {String} mainColor 
 * @param {String} secondaryColor
 * 
 * @returns new radio id
 */
const createRadio = async(radioName, slogan, logo, mainColor, secondaryColor) => {
	const token = localStorage.getItem("jwt")
	let data = new FormData()

	data.set("radioName", radioName)
	data.set("slogan", slogan)
	data.set("mainColor", mainColor)
	data.set("secondaryColor", secondaryColor)
	data.append("logo", logo)

	let res = await axios.post(`${API_URL}/radio`, data, {
		headers: {
			Authorization: token,
			'Content-Type': 'multipart/form-data'
		}
	})

	if (res.status < 400) {
		return res.data.radio._id
	} else {
		throw TypeError("Invalid Request")
	}
}

/**
 * 
 * @param {String} path 
 */
const getImage = (path) => `${API_URL}${path}`

/**
 * @returns {[String]}
 */
const getSongs = async() => {
	const token = localStorage.getItem("jwt")

	let res = await axios.get(`${API_URL}/radio/songs`, {
		headers: {
			Authorization: token
		}
	})
	if (res.status < 400) {
		return res.data.files
	}
}

/**
 * 
 * @param {String} name 
 * @param {[String]} songs
 * @param {String} radioId
 */
const createPlaylist = async(name, songs, radioId) => {
	const token = localStorage.getItem("jwt")

	let res = await axios.post(`${API_URL}/radio/playlist`, {
		name,
		songs,
		radioId
	}, {
		headers:{
			Authorization: token
		}
	})
	if (res.status < 400) {
		return res.data.playlist
	}
}

/**
 * 
 * @param {String} radioId 
 */
const getCurrentRadioSongs = async(radioId) => {
	let res = await axios.get(`${API_URL}/radio/${radioId}/playing`)

	if (res.status < 400) {
		return res.data.songs
	}
}

const getAudioUrl = (name) => `${API_URL}/radio/play/${name}`


export {register, login, getRadios, createRadio, getRadio, getImage, getSongs, createPlaylist, getCurrentRadioSongs, getAudioUrl}