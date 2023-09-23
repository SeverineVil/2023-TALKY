const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const likesRoutes = require("./routes/likes.routes");

const app = express();

app.use(cookieParser());
const corsOptions = {
  origin: process.env.CLIENT_URL ?? "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type", "Authorization"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(express.json());

// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// Serve REACT APP
app.use(express.static(path.join(__dirname, "..", "..", "client", "dist")));

// MULTER : UpLoad pictures
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(
      null,
      path.join(__dirname, "..", "..", "client", "public", "upload")
    ); // Chemin d'accès au dossier de destination des fichiers
  },
  filename(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  const { file } = req;
  res.status(200).json(file.filename);
});

// API routes
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/likes", likesRoutes);

// Redirect all requests to the REACT app
const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "client",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export
module.exports = app;
