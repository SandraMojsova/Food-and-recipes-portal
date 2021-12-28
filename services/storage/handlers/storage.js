const cfg = require('../../../pkg/config');
const fs = require('fs');

const cfgApp = cfg.get('storage');

const uploadUserImage = async (req, res) => {
    if (req.files.file.size > cfgApp.max_filesize) {
        return res.status(400).send('File exceeds max file size');
    }
    if (!cfgApp.allowed_filetypes.includes(req.files.file.mimetype)) {
        return res.status(400).send('Filetype not allowed');
    }
    let userDirPath = `${__dirname}/../../../${cfgApp.upload_dir_users}`;

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
    let userDirPath = `${__dirname}/../../../${cfgApp.upload_dir_users}`;
    let filePath = `${userDirPath}/${req.params.filename}`;
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('Image not found');
    }
    res.download(filePath);
};

const uploadRecipeImage = async (req, res) => {
    if (req.files.file.size > cfgApp.max_filesize) {
        return res.status(400).send('Image exceeds max file size');
    }
    if (!cfgApp.allowed_filetypes.includes(req.files.file.mimetype)) {
        return res.status(400).send('Filetype not allowed');
    }
    let recipePath = `${__dirname}/../../../${cfgApp.upload_dir_recipes}`;

    if (!fs.existsSync(recipePath)) {
        fs.mkdirSync(recipePath);
    }

    let fileName = `${req.files.file.name}`;
    let filePath = `${recipePath}/${fileName}`;

    req.files.file.mv(filePath, err => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        res.status(200).send({ filename: `/api/v1/storage/recipes/${fileName}` });
    });
};

const getRecipeImage = (req, res) => {
    let recipePath = `${__dirname}/../../../${cfgApp.upload_dir_recipes}`;
    let filePath = `${recipePath}/${req.params.filename}`;
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('Image not found');
    }
    res.download(filePath);
}

module.exports = {
    uploadUserImage,
    getUserImage,
    uploadRecipeImage,
    getRecipeImage
}