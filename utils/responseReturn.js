module.exports.responseReturn = (res, status, data) => {
	res.status(status).json(data);
	return;
};
