function logErrors(err, req, res, next) {
	console.log('++++++++++++++++++++');
	console.error(err.stack);
	console.log('++++++++++++++++++++');
	next(err);
}

function clientErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.status(500).send({ error: 'Something failed!' });
	} else {
		next(err);
	}
}

function errorHandler(err, req, res, next) {
	console.log('=======++++====++++====');
	console.log(err.message);
	console.log('=======++++====++++====');
	res.status(500).json({ error: err.message });
}

module.exports = { errorHandler, logErrors };
