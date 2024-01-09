require("dotenv").config();
const adminModel = require("../models/adminModal");
const customerModel = require("../models/customerAuthModel");
const { responseReturn } = require("../utils/responseReturn");
const jwt = require("jsonwebtoken");

exports.isUserAuthorize = async (req, res, next) => {
	const bearerToken = req.headers.authorization;
	if (!bearerToken)
		return responseReturn(res, 222, {
			error: "user unauthorized. plesase login.",
		});

	const token = bearerToken.split(" ")[1];


	const user = await jwt.verify(
		token,
		process.env.login_token_secret,
		async (err, verifiedJwt) => {
			if (err) {
				res.status(223).json({ error: "jwt token expried" });
				return;
			}
			return verifiedJwt;
		},
	);

	if (user) {
		req.user = user;
		next();
	}
};
