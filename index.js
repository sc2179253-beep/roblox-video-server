const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/video', async (req, res) => {
    const videoUrl = req.body.url;

    if (!videoUrl) {
        return res.status(400).json({ error: "กรุณาใส่ลิงก์" });
    }

    try {
        // ส่งลิงก์กลับไปตรงๆ ให้ Roblox ไปจัดการเล่นผ่าน VideoFrame หรือ MediaPlayer ในตัว
        res.json({ directUrl: videoUrl });
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
