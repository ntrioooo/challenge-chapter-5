const express = require("express");
const app = express();
const handler = require("./handler");
const path = require("path");
const multer = require("multer");
const middleware = require("./middleware");
const bodyParser = require("body-parser");
const session = require('express-session');
const flush = require('connect-flash');

const port = 8000;

const PUBLIC_DIRECTORY = path.join(__dirname, "public");

const uploadDirectory = path.join(__dirname, "./uploads");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadDirectory);
    },

    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
}));
app.use(flush());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(PUBLIC_DIRECTORY));

app.set("view engine", "ejs");

app.use(bodyParser.json());

app.get("/", handler.handleRoot);

app.get("/size", handler.handleSizeFilter)

app.get("/cars/create", handler.handlePageCreateCar);

app.get("/cars/:id/update", middleware.setCar, handler.handlePageUpdateCar);

app.post("/cars/:id/update", multer({ storage: storage }).single("gambar"),middleware.setCar, handler.handleUpdateCar);

app.post("/cars", multer({ storage: storage }).single("gambar"), handler.handleCreateCar);

app.get("/cars/:id/delete", middleware.setCar, handler.handleDeleteCar);

app.use("/uploads", express.static("uploads"));

app.use("/css", express.static("views/css"));

app.use("/images", express.static("views/images"));

app.use("/js", express.static("views/js"));

app.use("/", (req, res) => {
    res.status(404);
    res.send("Page Not Found");
});

app.listen(port, () => {
    console.log("Listening to Port 8000");
});