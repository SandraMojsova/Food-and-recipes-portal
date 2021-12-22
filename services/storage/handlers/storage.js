const fs = require('fs');

let max_filesize = 1048576;
let allowed_filetypes = ["image/jpg", "image/jpeg", "image/pjpg", "image/png", "image/gif"];
const upload = async (req, res) => {
    console.log(req.files.file);
    if (req.files.file.size > max_filesize) {
        return res.status(400).send('File exceeds max file size');
    }
    // console.log(req.files.file.type);

    if (!allowed_filetypes.includes(req.files.file.mimetype)) {
        return res.status(400).send('Filetype not allowed');
    }

    let userDir = `user_${req.user.uid}`;
    let userDirPath = `${__dirname}/../../../files/${userDir}`;

    if (!fs.existsSync(userDirPath)) {
        fs.mkdirSync(userDirPath);
    }

    let fileName = `${req.files.file.name}`;
    let filePath = `${userDirPath}/${fileName}`;

    let f = `api`
    req.files.file.mv(filePath, err => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        res.status(200).send({ filename: fileName, filepath: f });
    });
};

module.exports = {
    upload
}