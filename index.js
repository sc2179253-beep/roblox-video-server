const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.use(express.json());

// เส้นทางสำหรับรับลิงก์ YouTube และแปลงเป็นลิงก์ไฟล์วิดีโอตรงๆ
app.post('/api/video', async (req, res) => {
    const videoUrl = req.body.url;

    if (!ytdl.validateURL(videoUrl)) {
        return res.status(400).json({ error: "ลิงก์ YouTube ไม่ถูกต้อง" });
    }

    try {
        // ดึงข้อมูลวิดีโอและเลือก format ที่เป็นไฟล์วิดีโอ .mp4 ตรงๆ
        const info = await ytdl.getInfo(videoUrl);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });

        // ส่งลิงก์ไฟล์วิดีโอตรงๆ กลับไปให้ Roblox
        res.json({ directUrl: format.url });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "ไม่สามารถแปลงวิดีโอได้" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
