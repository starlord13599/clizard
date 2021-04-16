const path = require('path');
const multer = require('multer');

//storage functions for uploading file
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},
	filename: (req, file, cb) => {
		cb(null, `${file.fieldname}${path.extname(file.originalname)}`);
	}
});

//For checking whether the user uploads proper file
function checkExtension(req, file, cb) {
	const extensions = /jpg|jpeg/;

	const isValid = extensions.test(path.extname(file.originalname).toLowerCase());

	if (isValid) {
		return cb(null, true);
	}

	return cb('Cannot not upload this type of file');
}

//configure multer object
const upload = multer({ storage: storage, fileFilter: checkExtension }).single('image');

module.exports = { upload };
