const express = require("express");
const app = express();
const multer = require("multer");
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "") + file.originalname);
  },
}); // STORAGE OPTIONS

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
}; // FILE TYPES OPTIONS

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB FILESIZE LIMIT
  },
  fileFilter,
}); // UPLOAD OPTIONS

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", upload.single("sampleImage"), (req, res) => {
  res.send(req.file.path);
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
