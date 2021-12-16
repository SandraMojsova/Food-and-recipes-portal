
const fs = require('fs');

let max_filesize = 1048576;
let allowed_filetypes=  ["image/jpg","image/jpeg", "image/pjpg", "image/png", "image/gif"];
const upload = async (req, res) => {

    if (req.files.document.size > max_filesize) {
        return res.status(400).send('File exceeds max file size');
    }

    if (!allowed_filetypes.includes(req.files.document.mimetype)) {
        return res.status(400).send('Filetype not allowed');
    }

    let userDir = `user_${req.user.uid}`;
    let userDirPath = `${__dirname}/../files/${userDir}`;

    if(!fs.existsSync(userDirPath)) {
        fs.mkdirSync(userDirPath);
    }

    // let fileID = strings.makeID(6);
    // let fileName = `${fileID}_${req.files.document.name}`;
    let fileName = `${req.files.document.name}`;
    let filePath = `${userDirPath}/${fileName}`;
    req.files.document.mv(filePath, err => {
        if(err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        res.status(200).send({filename: fileName});
    });
};

module.exports={
    upload
}