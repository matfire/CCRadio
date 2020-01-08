const router = require("express").Router()
const bcrypt = require("bcrypt")


router.post("/login", (req, res) => {
	UserModel.findOne({email:req.body.email}).then(user => {
		if (bcrypt.compareSync(req.body.password, user.password)) {
			let token = jwt.sign(JSON.stringify(user), "lifebeforedeath")
			res.json({token, user})
		} else {
			res.status(401).json({message:"wrong credentials"})
		}
	}).catch(() => {
		res.status(401).json({message:"wrong credentials"})
	})
})

router.post("/register", (req, res) => {
	let {email, password} = req.body
	UserModel.findOne({email}).then((user) => {
		if (user)
			res.status(401).json({message:"invalid credentials"})
		else {
			UserModel.create({email, password:bcrypt.hashSync(password, 12)}).then((user) => {
				res.json({token:jwt.sign(JSON.stringify(user), "lifebeforedeath"), user})
			}).catch(() => {
				res.status(500).json({message:"something went wrong; please try again"})
			})
		}
	}).catch(() => {
		res.status(500).json({message:"something went wrong; please try again"})
	})
})

module.exports = router