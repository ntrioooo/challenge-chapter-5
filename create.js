const { Size } = require('./models')

Size.create({
    nama_size: 'Large'
}).then(size => {
    console.log(size)
})