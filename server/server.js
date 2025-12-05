const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const dbFile = __dirname + "/reservations.json";

// 預約 API
app.post("/reserve", (req, res) => {
    const reservation = req.body;

    let data = [];
    if (fs.existsSync(dbFile)) {
        data = JSON.parse(fs.readFileSync(dbFile));
    }

    data.push(reservation);
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));

    res.json({ message: "預約成功！我們將與您確認。" });
});

app.listen(3000, () => console.log("✔ 伺服器已啟動：http://localhost:3000"));
