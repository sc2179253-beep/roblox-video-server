const express = require('express');
const ytdl = require('@distube/ytdl-core'); // เปลี่ยนตรงนี้
const app = express();

app.use(express.json());

app.post('/api/video', async (req, res) => {
    const videoUrl = req.body.url;

    // เปลี่ยนฟังก์ชันตรวจสอบนิดหน่อย
    if (!ytdl.validate(videoUrl)) { 
        return res.status(400).json({ error: "ลิงก์ YouTube ไม่ถูกต้อง" });
    }

    try {
        const info = await ytdl.getInfo(videoUrl);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
        res.json({ directUrl: format.url });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถแปลงวิดีโอได้" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
