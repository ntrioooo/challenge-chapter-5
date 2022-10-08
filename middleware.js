const { Cars } = require('./models')

const setCar = (req, res, next) => {
    Cars.findOne({
        where : { id : req.params.id }
    }).then(car => {
        if(!car){
            res.status(404).json({
                status : "FAIL",
                error : "Car not found!"
            });
            return;
        }

        req.car = car
        next()
    })
}

module.exports = { setCar }