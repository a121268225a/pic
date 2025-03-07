const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 靜態檔案路徑設定，讓 Vercel 能夠正確讀取 public 資料夾
app.use(express.static('public'));

// 動態路由來根據網址選擇不同資料夾的圖片
app.get('/:folder.jpg', (req, res) => {
    const folderName = req.params.folder;
    const imageDir = path.join(__dirname, 'public', folderName);

    fs.readdir(imageDir, (err, files) => {
        if (err || files.length === 0) {
            return res.status(404).send(`No images found in the folder: ${folderName}`);
        }
        const randomFile = files[Math.floor(Math.random() * files.length)];
        res.sendFile(path.join(imageDir, randomFile));
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
