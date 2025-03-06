
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 圖片存放資料夾
const IMAGE_DIR = path.join(__dirname, 'public', 'images');

app.get('/random.jpg', (req, res) => {
    fs.readdir(IMAGE_DIR, (err, files) => {
        if (err || files.length === 0) {
            return res.status(404).send('No images found');
        }
        const randomFile = files[Math.floor(Math.random() * files.length)];
        res.sendFile(path.join(IMAGE_DIR, randomFile));
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
