const fs = require('fs');

let max_filesize = 1048576;
let allowed_filetypes = ["image/jpg", "image/jpeg", "image/pjpg", "image/png", "image/gif"];
const uploadUserImage = async (req, res) => {
    if (req.files.file.size > max_filesize) {
        return res.status(400).send('File exceeds max file size');
    }

    if (!allowed_filetypes.includes(req.files.file.mimetype)) {
        return res.status(400).send('Filetype not allowed');
    }

    // let userDir = `user_${req.user.uid}`;
    let userDirPath = `${__dirname}/../../../files/users`;

    if (!fs.existsSync(userDirPath)) {
        fs.mkdirSync(userDirPath);
    }

    let fileName = `${req.files.file.name}`;
    let filePath = `${userDirPath}/${fileName}`;

    req.files.file.mv(filePath, err => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        res.status(200).send({ filename: `/api/v1/storage/users/${fileName}` });
    });
};

const getUserImage = (req, res) => {
    let userDirPath = `${__dirname}/../../../files/users`;
    let filePath = `${userDirPath}/${req.params.filename}`;
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('Image not found');
    }
    res.download(filePath);
}

module.exports = {
    uploadUserImage,
    getUserImage
}