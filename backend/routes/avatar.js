const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware')
const dbMethodsUpdate = require('../components/dbMethods/dbMethodsUpdate')
const dbMethodsGet = require('../components/dbMethods/dbMethodsGet')

const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(file.originalname.split('.').pop());
        if (mimeType && extname) {
            return cb(null, true);
        }
        cb(new Error('Error: File upload only supports the following filetypes - ' + fileTypes));
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
});

router.post('/', authMiddleware, upload.single('avatar'), async (req, res) => {
    const user = req.user

    if (!user) {
        return res.status(404).json({ Error: 'User not found' });
    }

    const buffer = await sharp(req.file.buffer)
        .resize({ width: 150, height: 150 })
        .toBuffer();

    dbMethodsUpdate.updateUserById(user.id, {avatar: buffer}, (err, result) => {
        if (err) res.status(500).send('Error uploading avatar');
        res.json({status: "Success", message: 'Avatar uploaded and saved to database'});
    })
})
router.get('/', authMiddleware, async (req, res) => {
    const user = req.user

    if (!user) {
        return res.status(404).json({ Error: 'User not found' });
    }

    dbMethodsGet.getUser(user.id, (err, result) => {
        const avatar = result[0].avatar;
        const base64Avatar = Buffer.from(avatar).toString('base64');
        res.send(`data:image/*;base64,${base64Avatar}`);
    })
})
module.exports = router;