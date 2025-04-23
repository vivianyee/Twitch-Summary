import express from "express";
import { exec } from "child_process";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.post("/download", (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).send("Missing URL");

  const cmd = `yt-dlp -x --audio-format mp3 -o ./downloads/%(title)s.%(ext)s ${url}`;
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.status(500).send("Download failed");
    }
    console.log(stdout);
    res.send("Download started");
  });
});

app.listen(3000, () => console.log("yt-dlp-server listening on port 3000"));
