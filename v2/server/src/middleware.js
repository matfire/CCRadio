const jwt = require("jsonwebtoken")


const isAuthenticated = (req, res, next) => {
	let {authorization} = req.headers
	if (authorization) {
		if (jwt.verify(authorization, "lifebeforedeath")) {
			let user = jwt.decode(authorization)
			req.user = user
			next()
		} else {
			res.status(401).json({message:"invalid token"})
		}
	} else {
		res.status(401).json({message:"invalid token"})
	}
}

module.exports = {isAuthenticated}