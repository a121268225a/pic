const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 允許讀取 public 內的靜態檔案
app.use(express.static('public'));

// 支援不同的資料夾，例如 /images1.jpg 讀取 public/images1/ 的圖片
app.get('/:folder.jpg', (req, res) => {
    const folderName = req.params.folder;
    const imageDir = path.join(__dirname, 'public', folderName);

    fs.readdir(imageDir, (err, files) => {
        if (err || files.length === 0) {
            return res.status(404).send(`No images found in folder: ${folderName}`);
        }

        // 只選取圖片檔案（.jpg, .png, .gif）
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

        if (imageFiles.length === 0) {
            return res.status(404).send(`No valid image files in folder: ${folderName}`);
        }

        // 隨機選擇一張圖片
        const randomFile = imageFiles[Math.floor(Math.random() * imageFiles.length)];
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.sendFile(path.join(imageDir, randomFile));
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
