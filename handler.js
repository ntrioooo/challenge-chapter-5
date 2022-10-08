const { Cars } = require("./models");

const handleRoot = (req, res) => {
        Cars.findAll({
            include: [{all:true, nested:true}]
        })
            .then((cars) => {
                res.status(200).render("index", {
                    name: req.query.name || "Guest",
                    cars: cars,
                    message: req.flash('message')
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status: "Fail",
                    message: err.message,
                });
            });
    
};

const handleSizeFilter = (req, res) => {
    Cars.findAll({
            where: { size_id : parseInt(req.query.id) }
        }
        )
            .then((cars) => {
                res.status(200).render("index", {
                    name: req.query.name || "Guest",
                    cars: cars,
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status: "Fail",
                    message: err.message,
                });
            });
}

const handlePageCreateCar = (req, res) => {
    res.render("create");
};

const handleCreateCar = (req, res) => {
    Cars.create({
            nama: req.body.nama,
            harga: req.body.harga,
            gambar: req.file.filename,
            size_id: req.body.size,
        })
        .then((result) => {
            req.flash('message', 'Mobil berhasil dibuat')
            res.send('<script>window.location.href="/";</script>');
        })
        .catch((err) => {
            res.status(422).send("Can't Create Car");
        });
};

const handleDeleteCar = (req, res) => {
    const car = req.car;
    car
        .destroy()
        .then(() => {
            req.flash('message', 'Mobil berhasil dihapus')
            res.send('<script>window.location.href="/";</script>');
        })
        .catch((err) => {
            res.status(422).send("Can't Delete Car");
        });
};

function handlePageUpdateCar(req, res) {
    const car = req.car;
    res.render("update", {
        id: car.id,
        nama: car.nama,
        harga: car.harga,
        gambar: car.gambar,
        size_id: car.size_id,
    });
}

const handleUpdateCar = (req, res) => {
    const car = req.car;
    let gambar = '';
    if(req.file == undefined){
        gambar = car.gambar
    }else{
        gambar = req.file.filename
    }
    car.update({
            nama: req.body.nama,
            harga: req.body.harga,
            gambar: gambar,
            size_id: req.body.size,
        })
        .then((result) => {
            req.flash('message', 'Mobil berhasil diedit')
            res.send('<script>window.location.href="/";</script>');
        })
        .catch((err) => {
            res.status(422).send("Can't Update Car");
        });
};

module.exports = {
    handleRoot,
    handlePageCreateCar,
    handleCreateCar,
    handleDeleteCar,
    handleUpdateCar,
    handlePageUpdateCar,
    handleSizeFilter
};