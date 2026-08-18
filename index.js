const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/video', (req, res) => {
    const videoUrl = req.body.url;
    console.log("ได้รับลิงก์จาก Roblox แล้ว:", videoUrl);
    res.json({ status: "success", message: "รับลิงก์เรียบร้อย เตรียมประมวลผล" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
